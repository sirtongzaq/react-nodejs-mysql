import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
export default function Header({ logout, user }) {
  const router = useRouter();
  const [userRole, setUserRole] = useState([]);

  const routeHome = () => {
    router.push("/");
  };

  useEffect(() => {
    setUserRole(user?.user?.user_role);
  }, [user]);

  return (
    <Fragment>
      <div className="header-container">
        <h1
          style={{ color: "white", cursor: "pointer" }}
          onClick={() => {
            routeHome();
          }}
        >
          ROPA
        </h1>

        <div className="header-menu">
          <div className="header-dept" onClick={() => router.push("/dept")}>
            แผนกในหน่วยงาน
          </div>
          <div
            className="header-profile"
            style={{
              display:
                userRole === "User" || userRole === "Editor" ? "none" : "block",
            }}
            onClick={() => {
              router.push("/peronal-info");
            }}
          >
            แสดงข้อมูลส่วนบุคคล
          </div>
        </div>

        <div className="header-subtext">
          <div className="header-username">
            <span>
              {" "}
              <FontAwesomeIcon icon={SolidIcon.faUser} /> {user?.user?.username}
            </span>
          </div>
          <div
            onClick={() => {
              logout();
            }}
            className="header-logout"
          >
            <span>
              ออกจากระบบ
              <span>
                {" "}
                <FontAwesomeIcon
                  icon={SolidIcon.faRightFromBracket}
                ></FontAwesomeIcon>
              </span>
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
