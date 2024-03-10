import { Fragment } from "react";

export default function CardDept({ dep_name, handleDel }) {
  return (
    <Fragment>
      <div className="dept-card">
        <div className="dept-name">ชื่อแผนก {dep_name}</div>
        <div className="dept-action">
          <div className="dept-edit">edit</div>
          <div
            onClick={() => {
              handleDel();
            }}
            className="dept-delete"
          >
            delete
          </div>
        </div>
      </div>
    </Fragment>
  );
}
