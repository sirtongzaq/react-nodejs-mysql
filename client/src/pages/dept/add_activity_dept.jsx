import ActInfoTable from "@/components/components/acitivity_info_table";
import ActMeasure from "@/components/components/activity_measure";
import AddActInfoForm from "@/components/components/add_act_info_form";
import toastNoti from "@/components/components/toast";
import Layout from "@/components/templates/layout";
import actService from "@/services/actservice";
import authService from "@/services/authservice";
import depService from "@/services/deptservice";
import MeasuresService from "@/services/measuresservice";
import { useRouter } from "next/router";
import { Fragment, use, useEffect, useState } from "react";

export default function AddActDept() {
  const router = useRouter();
  const { id } = router.query;
  const [dept, setDept] = useState([]);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(null);
  const [formDataInfo, setFormDataInfo] = useState(null);
  const [measure, setMeasure] = useState([]);
  const [actId, setId] = useState("");
  const [orMeasure, setOrMeasure] = useState([]);
  const [techMeasure, setTechMearue] = useState([]);
  const [phyMeasure, setPhyMearue] = useState([]);

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
  }, [id]);

  useEffect(() => {
    console.log("formData2", formDataInfo);
  }, [formDataInfo]);

  useEffect(() => {
    console.log(measure);
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
            <ActInfoTable
              formData={formData}
              onPageChange={onPageChange}
              currPage={page}
            ></ActInfoTable>
          </div>
        </Fragment>
      )}
      {page == 3 && (
        <Fragment>
          <div className="">
            <ActMeasure measure={orMeasure}></ActMeasure>
            <ActMeasure measure={techMeasure}></ActMeasure>
            <ActMeasure measure={phyMeasure}></ActMeasure>
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
          <Fragment></Fragment>
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
