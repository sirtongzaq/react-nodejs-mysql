import ActInfoTable from "@/components/components/acitivity_info_table";
import ActMeasure from "@/components/components/activity_measure";
import AddActInfoForm from "@/components/components/add_act_info_form";
import modalStyle from "@/components/components/modalstyle";
import toastNoti from "@/components/components/toast";
import NewRowTable from "@/components/components/new_row_table";
import Layout from "@/components/templates/layout";
import actService from "@/services/actservice";
import authService from "@/services/authservice";
import dataInActService from "@/services/datainactservice";
import depService from "@/services/deptservice";
import MeasuresService from "@/services/measuresservice";
import { Modal, Box } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, use, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

export default function AddActDept() {
  const router = useRouter();
  const { id } = router.query;
  const [dept, setDept] = useState([]);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(null);
  const [formDataInfo, setFormDataInfo] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [removeTableDataArr, setRemoveTableDataArr] = useState([]);
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
  const [dataInAct, setDataInAct] = useState([]);
  const [dataInActApproveDestroy, setDataInActApproveDestroy] = useState([]);
  const [dataInActConditionNameAccess, setDataInActConditionNameAccess] =
    useState([]);
  const [dataInActConditionToAccess, setDataInActConditionToAccess] = useState(
    []
  );
  const [dataInActHowToAccess, setDataInActHowToAccess] = useState([]);
  const [dataInActLegalBase, setDataInActLegalBase] = useState([]);
  const [dataInActName, setDataInActName] = useState([]);
  const [dataInActNameAccess, setDataInActNameAccess] = useState([]);
  const [dataInActObject, setDataInActObject] = useState([]);
  const [dataInActSource, setDataInActSource] = useState([]);
  const [dataInActStorage, setDataInActStorage] = useState([]);
  const [dataInActSubject, setDataInActSubject] = useState([]);
  const [dataInActTimePeriod, setDataInActTimePeriod] = useState([]);
  const [dataInActType, setDataInActType] = useState([]);
  const [dataInActTypeDetail, setDataInActTypeDetail] = useState([]);
  const [dataInActWayDestroy, setDataInActWayDestroy] = useState([]);
  const [dataInActWhouseInorg, setDataInActWhouseInorg] = useState([]);
  const [dataInActWhouseOutorg, setDataInActWhouseOutorg] = useState([]);

  const submitData = async () => {
    try {
      let hasEmptyValue = false;
      for (const key in measureForm) {
        if (measureForm[key] === "") {
          toastNoti.toasterror("กรุณากรอกข้อมูลในฟอร์มทุกช่อง");
          hasEmptyValue = true;
          break;
        }
      }
      if (!hasEmptyValue) {
        await actService.createAct(formDataInfo);
        for (let i of tableData) {
          await dataInActService.createDataInAct(i);
        }
        await MeasuresService.createMeasures(measureForm);
        toastNoti.toastsuccess("เพิ่มกิจกรรมสำเร็จ");
        setTimeout(() => {
          router.push("/dept");
        }, 2000);
      }
    } catch (e) {
      console.log("error", e);
      toastNoti.toasterror("ไม่สามารถเชื่อมต่อกับ server ได้");
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
      setMeasureForm((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const onDeleteDataTable = (value) => {
    if (value) {
      setRemoveTableDataArr(value);
    } else {
      console.log("noDataTable");
    }
  };

  const onDataTable = (value) => {
    if (value) {
      setTableData(value);
    } else {
      console.log("noDataTable");
    }
  };

  const onCloseModal = () => {
    setOpenModalCreate((prev) => !prev);
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
      if (res.length > 0) {
        const lastIndex = res.length - 1;
        const lastData = res[lastIndex];
        setActId(parseInt(lastData.act_id + 1));
      } else {
        setActId(parseInt(1));
      }
    } catch (e) {
      console.log("err", e);
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
        toastNoti.toasterror("กรูณากรอกข้อมูลให้ครบ");
        return;
      }
    }
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 3) {
      setMeasureForm({
        act_id: actId,
        meas_org: "",
        meas_technical: "",
        meas_physic: "",
      });
    }
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

  const getDataInAct = async () => {
    try {
      const res = await dataInActService.getDataInAct();
      setDataInAct(res);
    } catch (e) {
      setDataInAct([]);
      console.log(e);
    }
  };

  const filterDataInActApproveDestroy = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_approve_destroy,
        label: ele.p_data_approve_destroy,
      };
      if (!uniqueValues.includes(ele.p_data_approve_destroy)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_approve_destroy);
      }
    });
    setDataInActApproveDestroy(option);
  };

  const filterDataInActConditionNameAccess = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_condition_name_access,
        label: ele.p_data_condition_name_access,
      };
      if (!uniqueValues.includes(ele.p_data_condition_name_access)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_condition_name_access);
      }
    });

    setDataInActConditionNameAccess(option);
  };

  const filterDataInActConditionToAccess = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_condition_to_access,
        label: ele.p_data_condition_to_access,
      };
      if (!uniqueValues.includes(ele.p_data_condition_to_access)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_condition_to_access);
      }
    });

    setDataInActConditionToAccess(option);
  };

  const filterDataInActHowToAccess = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_how_to_access,
        label: ele.p_data_how_to_access,
      };
      if (!uniqueValues.includes(ele.p_data_how_to_access)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_how_to_access);
      }
    });

    setDataInActHowToAccess(option);
  };

  const filterDataInActLegalBase = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_legal_base,
        label: ele.p_data_legal_base,
      };
      if (!uniqueValues.includes(ele.p_data_legal_base)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_legal_base);
      }
    });

    setDataInActLegalBase(option);
  };

  const filterDataInActName = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_name,
        label: ele.p_data_name,
      };
      if (!uniqueValues.includes(ele.p_data_name)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_name);
      }
    });

    setDataInActName(option);
  };

  const filterDataInActNameAccess = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_name_access,
        label: ele.p_data_name_access,
      };
      if (!uniqueValues.includes(ele.p_data_name_access)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_name_access);
      }
    });

    setDataInActNameAccess(option);
  };

  const filterDataInActObject = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_object,
        label: ele.p_data_object,
      };
      if (!uniqueValues.includes(ele.p_data_object)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_object);
      }
    });

    setDataInActObject(option);
  };

  const filterDataInActSource = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_source,
        label: ele.p_data_source,
      };
      if (!uniqueValues.includes(ele.p_data_source)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_source);
      }
    });

    setDataInActSource(option);
  };

  const filterDataInActStorage = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_storage,
        label: ele.p_data_storage,
      };
      if (!uniqueValues.includes(ele.p_data_storage)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_storage);
      }
    });

    setDataInActStorage(option);
  };

  const filterDataInActSubject = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_subject,
        label: ele.p_data_subject,
      };
      if (!uniqueValues.includes(ele.p_data_subject)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_subject);
      }
    });

    setDataInActSubject(option);
  };

  const filterDataInActTimePeriod = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_time_period,
        label: ele.p_data_time_period,
      };
      if (!uniqueValues.includes(ele.p_data_time_period)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_time_period);
      }
    });

    setDataInActTimePeriod(option);
  };

  const filterDataInActType = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_type,
        label: ele.p_data_type,
      };
      if (!uniqueValues.includes(ele.p_data_type)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_type);
      }
    });

    setDataInActType(option);
  };

  const filterDataInActTypeDetail = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_type_detail,
        label: ele.p_data_type_detail,
      };
      if (!uniqueValues.includes(ele.p_data_type_detail)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_type_detail);
      }
    });

    setDataInActTypeDetail(option);
  };

  const filterDataInActWayDestroy = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_way_destroy,
        label: ele.p_data_way_destroy,
      };
      if (!uniqueValues.includes(ele.p_data_way_destroy)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_way_destroy);
      }
    });

    setDataInActWayDestroy(option);
  };

  const filterDataInActWhouseInorg = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_whouse_inorg,
        label: ele.p_data_whouse_inorg,
      };
      if (!uniqueValues.includes(ele.p_data_whouse_inorg)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_whouse_inorg);
      }
    });

    setDataInActWhouseInorg(option);
  };

  const filterDataInActWhouseOutorg = () => {
    const option = [];
    const uniqueValues = [];

    dataInAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_whouse_outorg,
        label: ele.p_data_whouse_outorg,
      };
      if (!uniqueValues.includes(ele.p_data_whouse_outorg)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_whouse_outorg);
      }
    });

    setDataInActWhouseOutorg(option);
  };

  const filterOr = () => {
    const option = [];
    const uniqueValues = [];

    measure.map((ele) => {
      const opt = {
        value: ele.meas_org,
        label: ele.meas_org,
      };
      if (!uniqueValues.includes(ele.meas_org)) {
        option.push(opt);
        uniqueValues.push(ele.meas_org);
      }
    });

    setOrMeasure(option);
  };

  const filtertech = () => {
    const option = [];
    const uniqueValues = [];

    measure.map((ele) => {
      const opt = {
        value: ele.meas_technical,
        label: ele.meas_technical,
      };
      if (!uniqueValues.includes(ele.meas_technical)) {
        option.push(opt);
        uniqueValues.push(ele.meas_technical);
      }
    });

    setTechMearue(option);
  };

  const filterPhy = () => {
    const option = [];
    const uniqueValues = [];

    measure.map((ele) => {
      const opt = {
        value: ele.meas_physic,
        label: ele.meas_physic,
      };
      if (!uniqueValues.includes(ele.meas_physic)) {
        option.push(opt);
        uniqueValues.push(ele.meas_physic);
      }
    });

    setPhyMearue(option);
  };


  useEffect(() => {
    if (actId > 0) {
      setMeasureForm((prevState) => ({
        ...prevState[0],
        act_id: actId,
        meas_org: "",
        meas_technical: "",
        meas_physic: "",
      }));
    }
  }, [actId]);

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
    getDataInAct();
  }, [id]);

  useEffect(() => {
    filterOr();
    filtertech();
    filterPhy();
  }, [measure]);

  useEffect(() => {
    filterDataInActApproveDestroy();
    filterDataInActConditionNameAccess();
    filterDataInActConditionToAccess();
    filterDataInActHowToAccess();
    filterDataInActLegalBase();
    filterDataInActName();
    filterDataInActNameAccess();
    filterDataInActObject();
    filterDataInActSource();
    filterDataInActStorage();
    filterDataInActSubject();
    filterDataInActTimePeriod();
    filterDataInActType();
    filterDataInActTypeDetail();
    filterDataInActWayDestroy();
    filterDataInActWhouseInorg();
    filterDataInActWhouseOutorg();
  }, [dataInAct]);

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
          <div className="page-two-contrainer">
            <button
              className="btn-submit-activity"
              style={{
                marginBottom: "25px",
              }}
              onClick={() => {
                setOpenModalCreate(!openModalCreate);
              }}
            >
              เพิ่มแถว
              <span style={{ marginLeft: "5px" }}>
                <FontAwesomeIcon icon={SolidIcon.faPlus} />
              </span>
            </button>
            <div className="measure-add-row-modal">
              <Modal open={openModalCreate}>
                <Box sx={modalStyle.boxAddStyle}>
                  <button
                    onClick={() => {
                      setOpenModalCreate(!openModalCreate);
                    }}
                    className="close-button-new-role"
                  >
                    X
                  </button>
                  <NewRowTable
                    dataInActApproveDestroy={dataInActApproveDestroy}
                    dataInActConditionNameAccess={dataInActConditionNameAccess}
                    dataInActConditionToAccess={dataInActConditionToAccess}
                    dataInActHowToAccess={dataInActHowToAccess}
                    dataInActLegalBase={dataInActLegalBase}
                    dataInActName={dataInActName}
                    dataInActNameAccess={dataInActNameAccess}
                    dataInActObject={dataInActObject}
                    dataInActSource={dataInActSource}
                    dataInActStorage={dataInActStorage}
                    dataInActSubject={dataInActSubject}
                    dataInActTimePeriod={dataInActTimePeriod}
                    dataInActType={dataInActType}
                    dataInActTypeDetail={dataInActTypeDetail}
                    dataInActWayDestroy={dataInActWayDestroy}
                    dataInActWhouseInorg={dataInActWhouseInorg}
                    dataInActWhouseOutorg={dataInActWhouseOutorg}
                    handleDataTable={onDataTable}
                    onCloseModal={onCloseModal}
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
                actId={actId}
                handleDeleteIdTable={onDeleteDataTable}
              ></ActInfoTable>
            </div>
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
