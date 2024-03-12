import React, { Fragment, useState } from "react";

export default function AddDeptForm({ handleSubmit }) {
  const [deptName, setDeptName] = useState("");

  return (
    <Fragment>
      <div className="adddept-conrainer">
        <div className="adddept-header">เพิ่มแผนก</div>
        <form
          className="adddept-card"
          onSubmit={(e) => {
            handleSubmit(e, deptName);
            setDeptName("");
          }}
        >
          <div>ชื่อแผนก</div>
          <input
            type="text"
            placeholder=""
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            required
          />
          <button type="submit">บันทึก</button>
        </form>
      </div>
    </Fragment>
  );
}
