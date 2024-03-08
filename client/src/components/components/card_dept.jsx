import { Fragment } from "react";

export default function CardDept() {
    return (
        <Fragment>
            <div className="dept-card">
                <div className="dept-name">
                    ชื่อแผนก
                </div>
                <div className="dept-action">
                    <div className="dept-edit">edit</div>
                    <div className="dept-delete">delete</div>
                </div>
            </div>
            
        </Fragment>)
}