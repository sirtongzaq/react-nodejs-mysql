import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Aside() {
    const router = useRouter()
    return (
        <Fragment>
            <div className="aside">
                <div className="aside-content">
                    {/* <ul className="test">
                        <li onClick={() => router.push('/')}>หน้าแรก</li>
                        <li onClick={() => router.push('/dept')}>แผนกในหน่วยงาน</li>
                        <li>แสดงข้อมูลส่วนบุคคล</li>
                    </ul> */}
                    <div className="aside-home" onClick={() => router.push('/')}>
                        หน้าแรก
                    </div>
                    <div className="aside-dept" onClick={() => router.push('/dept')}>
                        แผนกในหน่วยงาน
                    </div>
                    <div className="aside-profile">
                        แสดงข้อมูลส่วนบุคคล
                    </div>

                </div>
            </div>
        </Fragment>)
}