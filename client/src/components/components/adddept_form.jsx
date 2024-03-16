import React, { Fragment, useState } from "react";

export default function AddDeptForm({ handleSubmit }) {
  const [deptName, setDeptName] = useState("");

  return (
    <Fragment>
      <div className="adddept-conrainer">
        <div className="adddept-header">
          <h1>เพิ่มแผนก</h1>
        </div>
        <form
          className="adddept-card"
          onSubmit={(e) => {
            handleSubmit(e, deptName);
            setDeptName("");
          }}
        >
          <label>ชื่อแผนก</label>
          <input
            type="text"
            placeholder=""
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
          />
          <button className="btn-submit-activity" type="submit">
            บันทึก
          </button>
        </form>
      </div>
    </Fragment>
  );
}
