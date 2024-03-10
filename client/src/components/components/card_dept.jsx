import { Fragment, useEffect, useState } from "react";

export default function CardDept({ dept }) {
    const [deptArr, setDeptArr] = useState([1, 2, 3])

    // useEffect(() => {
    //     setDeptArr(dept)
    // }, [dept])
    return (
        <Fragment>
            {deptArr.map(() => (<>
                <div className="dept-card">
                    <div className="dept-name">
                        ชื่อแผนก
                    </div>
                    <div className="dept-action">
                        <div className="dept-edit">edit</div>
                        <div className="dept-delete">delete</div>
                    </div>
                </div>
            </>))}

        </Fragment>)
}