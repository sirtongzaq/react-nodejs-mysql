import ActInfoTable from "@/components/components/acitivity_info_table";
import ActMeasure from "@/components/components/activity_measure";
import AddActInfoForm from "@/components/components/add_act_info_form";
import toastNoti from "@/components/components/toast";
import Layout from "@/components/templates/layout";
import actService from "@/services/actservice";
import authService from "@/services/authservice";
import depService from "@/services/deptservice";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

export default function AddActDept() {
  const router = useRouter();
  const { id } = router.query;
  const [dept, setDept] = useState([]);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(null);
  const [formDataInfo, setFormDataInfo] = useState(null);

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
    // setPage(1);
  }, [id]);

  useEffect(() => {
    console.log("formData2", formDataInfo);
  }, [formDataInfo]);

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
          <div className="actTable">
            <ActMeasure></ActMeasure>
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
