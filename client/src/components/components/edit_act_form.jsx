import { Fragment, useEffect, useState } from "react";

export default function EditActForm({ act, handleChangeData, userRole }) {
  const [actForm, setActform] = useState([]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedActForm = [...actForm];
    updatedActForm[index] = {
      ...updatedActForm[index],
      [name]: value,
    };
    setActform(updatedActForm);
  };

  useEffect(() => {
    setActform(act);
  }, [act]);

  useEffect(() => {
    handleChangeData(actForm);
  }, [actForm]);

  return (
    <Fragment>
      {actForm.map((formData, index) => (
        <div className="add-act-dept-container">
          {/* <div className="header-title">
                    <h1>เพิ่มกิจกรรม ของ department {dept.dept_id}</h1>
                </div> */}

          <form
            // onSubmit={() => { handleSubmit() }}
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
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                หน่วยงานที่บันทึกรายการ
                <input
                  type="text"
                  name="dept_name"
                  value={formData.dept_name}
                  onChange={(e) => handleChange(e, index)}
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
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                นามสกุลผู้บันทึกรายการ
                <input
                  type="text"
                  name="recorder_lastname"
                  value={formData.recorder_lastname}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
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
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                นามสกุลผู้ควบคุมข้อมูลส่วนบุคคล
                <input
                  type="text"
                  name="datacontroller_lastname"
                  value={formData.datacontroller_lastname}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                อีเมลแอดเดรสผู้ควบคุมข้อมูลส่วนบุคคล
                <input
                  type="text"
                  name="datacontroller_email"
                  value={formData.datacontroller_email}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                หมายเลขโทรศัพท์ผู้ควบคุมข้อมูลส่วนบุคคล
                <input
                  type="text"
                  name="datacontroller_number"
                  value={formData.datacontroller_number}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                ที่ตั้งของสถานที่ติดต่อผู้ควบคุมข้อมูลส่วนบุคคล
                <input
                  type="text"
                  name="datacontroller_contact_place"
                  value={formData.datacontroller_contact_place}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
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
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                นามสกุลเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
                <input
                  type="text"
                  name="dpo_lastname"
                  value={formData.dpo_lastname}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                อีเมลแอดเดรสเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
                <input
                  type="text"
                  name="dpo_email"
                  value={formData.dpo_email}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                หมายเลขโทรศัพท์เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
                <input
                  type="text"
                  name="dpo_number"
                  value={formData.dpo_number}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                ที่ตั้งของสถานที่ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล
                <input
                  type="text"
                  name="dpo_contact_place"
                  value={formData.dpo_contact_place}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
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
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
              <label>
                นามสกุลผู้ตรวจสอบบันทึกรายการ
                <input
                  type="text"
                  name="recordreviewer_lastname"
                  value={formData.recordreviewer_lastname}
                  onChange={(e) => handleChange(e, index)}
                  required
                  disabled={userRole === "User"}
                />
              </label>
            </div>
          </form>
          {/* <button onClick={() => { handleSubmit() }}>
                    ok
                </button> */}
        </div>
      ))}
    </Fragment>
  );
}
