import CardDept from "@/components/components/card_dept";
import SearchDept from "@/components/components/search_dept";
import toastNoti from "@/components/components/toast";
import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import depService from "@/services/deptservice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

export default function Dept() {
  const router = useRouter();
  const [dept, setDept] = useState([]);
  const [filterDept, setFilterDept] = useState([]);
  const [onSearch, setOnSearch] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState([]);
  const [userRole, setUserRole] = useState([]);

  const getUserFromToken = async (userToken) => {
    const res = await authService.getUserFromToken(userToken);
    if (res) {
      setUser(res);
    } else {
      setUser("noUser");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      getUserFromToken(token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const userRole = user?.user?.user_role;
      setUserRole(userRole);
    } else {
      router.push("/login");
    }
  }, [user]);

  const onChangeDeptList = (value) => {
    if (value === "") {
      setFilterDept([]);
      setOnSearch(false);
    } else {
      setOnSearch(true);
      const filteredDepartments = dept.filter((department) =>
        department.dept_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterDept(filteredDepartments);
    }
  };

  const getDep = async () => {
    try {
      const response = await depService.getDep();
      setDept(response);
    } catch (e) {
      console.log("error", e);
    }
  };

  const delDep = async (id) => {
    try {
      await depService.delDepFromId(id);
      getDep();
      toastNoti.toastsuccess("Delete department successfuly");
    } catch (e) {
      console.log("error", e);
      toastNoti.toasterror(e);
    }
  };

  useEffect(() => {
    getDep();
    setOnSearch(false);
  }, []);

  return (
    <Fragment>
      <div className="dept-add-search">
        <div className="dept-page-search">
          <SearchDept onChangeDeptList={onChangeDeptList} />
        </div>
        <div
          onClick={() => router.push("/dept/add_dept")}
          className="btn-submit-activity"
        >
          <div className="dept-add-text">
            <span>เพิ่มแผนก</span>
            <span style={{ marginLeft: "5px" }}>
              <FontAwesomeIcon icon={SolidIcon.faPlus} />
            </span>
          </div>
        </div>
      </div>

      <div className="dept-list">
        {onSearch == true ? (
          <>
            {filterDept.length > 0 ? (
              filterDept.map((d) => (
                <p key={d.dept_id}>
                  <CardDept
                    userRole={userRole}
                    dept={d}
                    handleDel={() => {
                      delDep(d.dept_id);
                    }}
                  />
                </p>
              ))
            ) : (
              <div>ไม่พบแผนกที่ค้นหา</div>
            )}
          </>
        ) : (
          <>
            {dept.length > 0 ? (
              dept.map((d) => (
                <p key={d.dept_id}>
                  <CardDept
                    userRole={userRole}
                    dept={d}
                    handleDel={() => delDep(d.dept_id)}
                  />
                </p>
              ))
            ) : (
              <p>no data dept</p>
            )}
          </>
        )}
      </div>
    </Fragment>
  );
}

Dept.getLayout = function getLayout(page) {
  const getUserByToken = async (token) => {
    try {
      const response = await authService.getUserFromToken(token);
      return response;
    } catch (e) {
      console.log("error", e);
    }
  };
  return <Layout getUserByToken={getUserByToken}>{page}</Layout>;
};
