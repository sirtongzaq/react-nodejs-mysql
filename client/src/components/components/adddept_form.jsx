import React, { Fragment, useState } from "react";

export default function AddDeptForm({ handleSubmit }) {
  const [depName, setDepName] = useState("");

  return (
    <Fragment>
      <div className="adddept-conrainer">
        <div className="adddept-header">เพิ่มแผนก</div>
        <form
          className="adddept-card"
          onSubmit={(e) => {
            handleSubmit(e, depName);
            setDepName("");
          }}
        >
          <div>ชื่อแผนก</div>
          <input
            type="text"
            placeholder="รหัสผ่าน"
            value={depName}
            onChange={(e) => setDepName(e.target.value)}
            required
          />
          <button type="submit">บันทึก</button>
        </form>
      </div>
    </Fragment>
  );
}
