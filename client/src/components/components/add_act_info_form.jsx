import actService from "@/services/actservice";
import React, { Fragment, use, useEffect, useMemo, useState } from "react";

export default function AddActInfoForm({
  dept,
  handleSubmit,
  currPage,
  handlePrevFrom,
  formDataInfo,
}) {
  const [formData, setFormData] = useState({
    act_id: "",
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

  const [previousFormData, setPreviousFormData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const getActLength = async () => {
    try {
      const res = await actService.getAct();
      if (res.length > 0) {
        const lastIndex = res.length - 1;
        const lastData = res[lastIndex];
        const actIdFilter = lastData.act_id + 1;
        setFormData((prevState) => ({
          ...prevState,
          act_id: actIdFilter,
        }));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          act_id: 1,
        }));
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (dept) {
      setFormData((prevState) => ({
        ...prevState,
        dept_id: dept.dept_id,
        dept_name: dept.dept_name,
      }));
    }
    if (formDataInfo) {
      setFormData(formDataInfo);
    }
  }, [formDataInfo, dept]);

  useEffect(() => {
    setCurrentPage(currPage);
    getActLength();
  }, [currPage]);

  useEffect(() => {
    setPreviousFormData(formData);
    handlePrevFrom(formData);
  }, [formData]);

  return (
    <Fragment>
      <div className="add-act-dept-container">
        <div className="header-title">
          <h1>เพิ่มกิจกรรม</h1>
        </div>

        <form
          onSubmit={handleSubmit()}
          className="act-dept-form"
          id="add-dept-form"
        >
          <div className="add-act-card">
            <h3>รายละเอียดกิจกรรม</h3>
            <label>
              กิจกรรมงานที่บันทึกรายการ
              <input
                type="text"
                name="act_name"
                value={formData.act_name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              หน่วยงานที่บันทึกรายการ
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
              ชื่อจริงผู้บันทึกรายการ
              <input
                type="text"
                name="recorder_firstname"
                value={formData.recorder_firstname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              นามสกุลผู้บันทึกรายการ
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
              ชื่อจริงผู้ควบคุมข้อมูล
              <input
                type="text"
                name="datacontroller_firstname"
                value={formData.datacontroller_firstname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              นามสกุลผู้ควบคุมข้อมูลส่วนบุคคล
              <input
                type="text"
                name="datacontroller_lastname"
                value={formData.datacontroller_lastname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              อีเมลแอดเดรสผู้ควบคุมข้อมูลส่วนบุคคล
              <input
                type="text"
                name="datacontroller_email"
                value={formData.datacontroller_email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              หมายเลขโทรศัพท์ผู้ควบคุมข้อมูลส่วนบุคคล
              <input
                type="text"
                pattern="\d*"
                maxlength="10"
                name="datacontroller_number"
                value={formData.datacontroller_number}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              ที่ตั้งของสถานที่ติดต่อผู้ควบคุมข้อมูลส่วนบุคคล
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
              ชื่อจริงเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
              <input
                type="text"
                name="dpo_firstname"
                value={formData.dpo_firstname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              นามสกุลเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
              <input
                type="text"
                name="dpo_lastname"
                value={formData.dpo_lastname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              อีเมลแอดเดรสเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
              <input
                type="text"
                name="dpo_email"
                value={formData.dpo_email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              หมายเลขโทรศัพท์เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
              <input
                type="text"
                pattern="\d*"
                maxlength="10"
                name="dpo_number"
                value={formData.dpo_number}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              ที่ตั้งของสถานที่ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
              <input
                type="text"
                name="dpo_contact_place"
                value={formData.dpo_contact_place}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="add-act-card">
            <h3>รายละเอียดผู้ตรวจสอบบันทึกรายการ</h3>
            <label>
              ชื่อจริงผู้ตรวจสอบบันทึกรายการ
              <input
                type="text"
                name="recordreviewer_firstname"
                value={formData.recordreviewer_firstname}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              นามสกุลผู้ตรวจสอบบันทึกรายการ
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
      </div>
    </Fragment>
  );
}
