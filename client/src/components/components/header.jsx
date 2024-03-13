import { useRouter } from "next/router";
import { Fragment } from "react";

export default function Header({ logout, user }) {
  const router = useRouter()
  return (
    <Fragment>
      <div className="header-container">
        <h1 style={{ color: "white" }} onClick={()=>{router.push('/')}}>ROPA</h1>

        <div className="header-menu">
          <div className="header-dept" onClick={() => router.push('/dept')}>
            แผนกในหน่วยงาน
          </div>
          <div className="header-profile">
            แสดงข้อมูลส่วนบุคคล
          </div>
        </div>

        <div className="header-subtext">
          <div className="header-username">
            <span> คุณ : {user?.user?.username}</span>
          </div>
          <div onClick={() => {
            logout();
          }} className="header-logout">
            <span>              
              ออกจากระบบ
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
