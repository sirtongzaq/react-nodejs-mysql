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

  useEffect(() => {
    getDept();
  }, [id]);

  useEffect(() => {
    if (dept) {
      setFormData((prevState) => ({
        ...prevState,
        dept_id: dept.dept_id,
        dept_name: dept.dept_name,
      }));
    }
  }, [dept]);

  useEffect(() => {
    console.log("data", formData);
  }, [formData]);

  return (
    <Fragment>
      <div className="add-act-dept-container">
        <h1>เพิ่มกิจกรรม ของ department {id}</h1>
        <form
          onSubmit={handleSubmit}
          className="act-dept-form"
          id="add-dept-form"
        >
          <div className="add-act-card">
            <h3>รายละเอียดกิจกรรม</h3>
            <label>
              act_name:
              <input
                type="text"
                name="act_name"
                value={formData.act_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              dept_name:
              <input
                type="text"
                name="dept_name"
                value={formData.dept_name}
                onChange={handleChange}
                required
                disabled
              />
            </label>
            <label>
              recorder_firstname:
              <input
                type="text"
                name="recorder_firstname"
                value={formData.recorder_firstname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              recorder_lastname:
              <input
                type="text"
                name="recorder_lastname"
                value={formData.recorder_lastname}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="add-act-card">
            <h3>รายละเอียดผู้ควบคุมข้อมูลส่วนบุคคล</h3>
            <label>
              datacontroller_firstname:
              <input
                type="text"
                name="datacontroller_firstname"
                value={formData.datacontroller_firstname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              datacontroller_lastname:
              <input
                type="text"
                name="datacontroller_lastname"
                value={formData.datacontroller_lastname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              datacontroller_email:
              <input
                type="text"
                name="datacontroller_email"
                value={formData.datacontroller_email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              datacontroller_number:
              <input
                type="text"
                name="datacontroller_number"
                value={formData.datacontroller_number}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              datacontroller_contact_place:
              <input
                type="text"
                name="datacontroller_contact_place"
                value={formData.datacontroller_contact_place}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="add-act-card">
            <h3>รายละเอียดเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล</h3>
            <label>
              dpo_firstname:
              <input
                type="text"
                name="dpo_firstname"
                value={formData.dpo_firstname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              dpo_lastname:
              <input
                type="text"
                name="dpo_lastname"
                value={formData.dpo_lastname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              dpo_contact_place:
              <input
                type="text"
                name="dpo_contact_place"
                value={formData.dpo_contact_place}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              dpo_email:
              <input
                type="text"
                name="dpo_email"
                value={formData.dpo_email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              dpo_phone:
              <input
                type="text"
                name="dpo_phone"
                value={formData.dpo_phone}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="add-act-card">
            <h3>รายละเอียดผู้ตรวจสอบบันทึกรายการ</h3>
            <label>
              recordreviewer_firstname:
              <input
                type="text"
                name="recordreviewer_firstname"
                value={formData.recordreviewer_firstname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              recordreviewer_lastname:
              <input
                type="text"
                name="recordreviewer_lastname"
                value={formData.recordreviewer_lastname}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </form>
        <div className="flex-row">
          <button className="btn-submit-activity" type="submit">
            กลับ
          </button>
          <button
            className="btn-submit-activity"
            type="submit"
            form="add-dept-form"
          >
            ถัดไป
          </button>
        </div>
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
