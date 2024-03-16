import ActInfoTable from "@/components/components/acitivity_info_table";
import ActMeasure from "@/components/components/activity_measure";
import AddActInfoForm from "@/components/components/add_act_info_form";
import modalStyle from "@/components/components/modalstyle";
import toastNoti from "@/components/components/toast";
import NewRowTable from "@/components/components/ืnew_row_table";
import Layout from "@/components/templates/layout";
import actService from "@/services/actservice";
import authService from "@/services/authservice";
import dataInActService from "@/services/datainactservice";
import depService from "@/services/deptservice";
import MeasuresService from "@/services/measuresservice";
import { Modal, Box } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, use, useEffect, useState } from "react";

export default function AddActDept() {
  const router = useRouter();
  const { id } = router.query;
  const [dept, setDept] = useState([]);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(null);
  const [formDataInfo, setFormDataInfo] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [actId, setActId] = useState(0);
  const [orMeasure, setOrMeasure] = useState([]);
  const [techMeasure, setTechMearue] = useState([]);
  const [phyMeasure, setPhyMearue] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [measureForm, setMeasureForm] = useState([
    {
      act_id: "",
      meas_org: "",
      meas_technical: "",
      meas_physic: "",
    },
  ]);

  const submitData = async () => {
    try {
      await actService.createAct(formDataInfo);
      for (let i of tableData) {
        await dataInActService.createDataInAct(i);
      }
      await MeasuresService.createMeasures(measureForm);
      console.log("Data submitted successfully");
    } catch (e) {
      console.log("error", e);
    }
  };

  const onDataMeasure = (value, name) => {
    if (value) {
      setMeasureForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      console.log("noDataMeasure");
    }
  };

  const onDataTable = (value) => {
    if (value) {
      setTableData(value);
    } else {
      console.log("noDataTable");
    }
  };

  const getsaveDataLocalStorage = async () => {
    try {
      const prvdept = localStorage.getItem("deptDataInfo");
      const formDataJson = JSON.parse(prvdept);
      if (formDataJson) {
        setFormDataInfo(formDataJson);
      }
    } catch (e) {
      console.log("err", e);
    }
  };

  const saveDataLocalStorage = () => {
    try {
      const formDataJson = JSON.stringify(formData);
      localStorage.setItem("deptDataInfo", formDataJson);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  };

  const getActLength = async () => {
    try {
      const res = await actService.getAct();
      const lastIndex = res.length - 1;
      const lastData = res[lastIndex];
      setActId(parseInt(lastData.act_id + 1));
    } catch (e) {
      setActId(0);
    }
  };

  const getDept = async () => {
    try {
      const res = await depService.getDepFromId(id);
      setDept(res);
    } catch (e) {
      setDept([]);
    }
  };
  const nextPage = () => {
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && formData[key] === "") {
        toastNoti.toasterror("Please fill all the fields in the form");
        return;
      }
    }
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handlePrevFrom = (formData) => {
    setFormData(formData);
  };

  const onPageChange = (formData) => {
    setFormData(formData);
  };

  const getMeasure = async () => {
    try {
      const res = await MeasuresService.getMeasures();
      setMeasure(res);
    } catch (e) {
      setMeasure([]);
      console.log(e);
    }
  };

  const filterOr = () => {
    const option = [];
    measure.map((ele) => {
      const opt = {
        value: ele.meas_org,
        label: ele.meas_org,
      };

      option.push(opt);
    });
    setOrMeasure(option);
  };

  const filtertech = () => {
    const option = [];
    measure.map((ele) => {
      const opt = {
        value: ele.meas_technical,
        label: ele.meas_technical,
      };

      option.push(opt);
    });
    setTechMearue(option);
  };

  const filterPhy = () => {
    const option = [];
    measure.map((ele) => {
      const opt = {
        value: ele.meas_physic,
        label: ele.meas_physic,
      };

      option.push(opt);
    });
    setPhyMearue(option);
  };

  useEffect(() => {
    // console.log("formData", formData);
  }, [formData]);

  useEffect(() => {
    console.log("actId", actId);
    if (actId > 0) {
      setMeasureForm((prevState) => ({
        ...prevState,
        act_id: actId,
      }));
    }
  }, [actId]);

  useEffect(() => {
    console.log("measureForm", measureForm);
  }, [measureForm]);

  useEffect(() => {
    setFormData(formData);
  }, [formData]);

  useEffect(() => {
    getsaveDataLocalStorage();
    if (page == 0) {
      router.back();
    } else if (page > 3) {
      setPage(page - 1);
    }
  }, [page]);

  useEffect(() => {
    getDept();
    getMeasure();
    getActLength();
  }, [id]);

  // useEffect(() => {
  //   console.log("formData2", formDataInfo);
  // }, [formDataInfo]);

  useEffect(() => {
    // console.log(measure);
    filterOr();
    filtertech();
    filterPhy();
  }, [measure]);

  return (
    <Fragment>
      {page === 1 && (
        <AddActInfoForm
          dept={dept}
          handleSubmit={saveDataLocalStorage}
          currPage={page}
          handlePrevFrom={handlePrevFrom}
          formDataInfo={formDataInfo}
        />
      )}
      {page == 2 && (
        <Fragment>
          <div className="actTable">
            <button
              onClick={() => {
                setOpenModalCreate(!openModalCreate);
              }}
            >
              สร้างแถว
            </button>
            <Modal open={openModalCreate}>
              <Box sx={modalStyle.boxStyle}>
                <button
                  onClick={() => {
                    setOpenModalCreate(!openModalCreate);
                  }}
                >
                  ปิด
                </button>
                <NewRowTable
                  handleDataTable={onDataTable}
                  onTableData={tableData}
                  actId={actId}
                />
              </Box>
            </Modal>
            <ActInfoTable
              formData={formData}
              onPageChange={onPageChange}
              currPage={page}
              newData={tableData}
              onNewData={onDataTable}
            ></ActInfoTable>
          </div>
        </Fragment>
      )}
      {page == 3 && (
        <Fragment>
          <div className="">
            <label>มาตรการเชิงองค์กร (Organizational Measures)</label>
            <ActMeasure
              measure={orMeasure}
              handleValue={onDataMeasure}
              field={"meas_org"}
            ></ActMeasure>
            <label>มาตรการเชิงเทคนิค (Technical Measures)</label>
            <ActMeasure
              measure={techMeasure}
              handleValue={onDataMeasure}
              field={"meas_technical"}
            ></ActMeasure>
            <label>มาตรการทางกายภาพ (Physical Measures)</label>
            <ActMeasure
              measure={phyMeasure}
              handleValue={onDataMeasure}
              field={"meas_physic"}
            ></ActMeasure>
          </div>
        </Fragment>
      )}

      <div className="flex-row">
        <button
          className="btn-submit-activity"
          type="submit"
          onClick={prevPage}
        >
          กลับ
        </button>
        {page != 3 ? (
          <button
            className="btn-submit-activity"
            type="submit"
            form="add-dept-form"
            onClick={nextPage}
          >
            ถัดไป
          </button>
        ) : (
          <button
            className="btn-submit-activity"
            type="submit"
            form="add-dept-form"
            onClick={() => {
              submitData();
            }}
          >
            บันทึก
          </button>
        )}
      </div>
    </Fragment>
  );
}

AddActDept.getLayout = function getLayout(page) {
  const getUserByToken = async (token) => {
    try {
      const response = await authService.getUserFromToken(token);
      return response;
    } catch (e) {
      console.log("error", e);
    }
  };
  return <Layout getUserByToken={getUserByToken}>{page}</Layout>;
};
