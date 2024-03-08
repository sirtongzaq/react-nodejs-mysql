import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Aside() {
    const router = useRouter()
    return (
        <Fragment>
            <div className="aside">
                <div className="aside-content">
                    <ul>
                        <li onClick={() => router.push('/')}>หน้าแรก</li>
                        <li onClick={() => router.push('/dept')}>แผนกในหน่วยงาน</li>
                        <li>แสดงข้อมูลส่วนบุคคล</li>
                    </ul>

                </div>
            </div>
        </Fragment>)
}