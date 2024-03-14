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
  const [formData, setFormData] = useState({
    act_name: "",
    datacontroller_firstname: "",
    datacontroller_lastname: "",
    datacontroller_email: "",
    datacontroller_number: "",
    datacontroller_contact_place: "",
    recorder_firstname: "",
    recorder_lastname: "",
    dept_id: "",
    dept_name: "",
    dpo_firstname: "",
    dpo_lastname: "",
    dpo_contact_place: "",
    dpo_email: "",
    dpo_number: "",
    recordreviewer_firstname: "",
    recordreviewer_lastname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await actService.createAct(formData);
      console.log(response.data);
      toastNoti.toastsuccess("Activity create succesfuly");
    } catch (error) {
      console.error("Error submitting form:", error);
      toastNoti.toasterror("Activity create fail");
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

  useEffect(() => {
    if (page == 0) {
      router.back()
    } else if (page > 3) {
      setPage(page - 1)
    }
  }, [page]);

  useEffect(() => {
    getDept();
    // setPage(1);
  }, [id]);

  return (
    <Fragment>
      {page === 1 && <AddActInfoForm dept={dept} handleSubmit={handleSubmit} currPage={page} />}
      {page == 2 && (
        <Fragment>
          <div className="actTable">
            <ActInfoTable></ActInfoTable>
          </div>
        </Fragment>)}
      {page == 3 && (
        <Fragment>
          <div className="actTable">
            <ActMeasure></ActMeasure>
          </div>
        </Fragment>)}

      <div className="flex-row">
        <button
          className="btn-submit-activity"
          type="submit"
          onClick={prevPage}
        >
          กลับ
        </button>
        {page != 3 ? (<button
          className="btn-submit-activity"
          type="submit"
          form="add-dept-form"
          onClick={nextPage}
        >
          ถัดไป
        </button>) : (<Fragment></Fragment>)}
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
