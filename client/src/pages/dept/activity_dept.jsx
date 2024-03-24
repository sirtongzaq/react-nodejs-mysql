import CardActiDept from "@/components/components/card_activity_dept";
import SearchActiDept from "@/components/components/search_activity_dept";
import Layout from "@/components/templates/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import authService from "@/services/authservice";
import actService from "@/services/actservice";
import depService from "@/services/deptservice";
import toastNoti from "@/components/components/toast";

export default function ActivityDept() {
  const router = useRouter();
  const { id } = router.query;
  const [activity, setActivity] = useState([]);
  const [dept, setDept] = useState([]);
  const [filterAct, setFilterAct] = useState([]);
  const [onSearch, setOnSearch] = useState(false);
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

  const getDept = async () => {
    try {
      const res = await depService.getDepFromId(id);
      setDept(res);
    } catch (e) {
      setDept([]);
    }
  };

  const getActivity = async () => {
    try {
      const response = await actService.getActFromDeptId(id);
      setActivity(response);
    } catch (e) {
      setActivity([]);
    }
  };

  const onChangeSearch = (value) => {
    if (value == "") {
      setFilterAct([]);
      setOnSearch(false);
    } else {
      setOnSearch(true);
      const newArr = activity.filter((act) =>
        act.act_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilterAct(newArr);
    }
  };

  const onDeleteAct = async (id) => {
    try {
      await actService.delActFromId(id);
      console.log("delete", id);
      // router.reload();
      getActivity();
      getDept();
      toastNoti.toastsuccess("ลบกิจกรรมสำเร็จ");
    } catch (err) {
      console.log("err==>", err);
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

  useEffect(() => {
    setDept(dept);
  }, [dept]);

  useEffect(() => {
    getActivity();
    getDept();
  }, [id]);

  return (
    <Fragment>
      <div className="dept-add-search">
        <div className="dept-acti-title" style={{ alignSelf: "end" }}>
          <span>กิจกรรมของแผนก {dept.dept_name}</span>
        </div>
        <div className="dept-page-search">
          <SearchActiDept onChangeActList={onChangeSearch} />
        </div>
        <div
          onClick={() =>
            router.push(`/dept/add_activity_dept?id=${dept.dept_id}`)
          }
          className="btn-submit-activity"
        >
          <div className="dept-add-text">
            <span>เพิ่มกิจกรรม</span>
            <span style={{ marginLeft: "5px" }}>
              <FontAwesomeIcon icon={SolidIcon.faPlus} />
            </span>
          </div>
        </div>
      </div>
      <div className="dept-list">
        {onSearch ? (
          <Fragment>
            {filterAct.length > 0 ? (
              <span>ค้นพบ {filterAct.length} กิจกรรม</span>
            ) : (
              <Fragment></Fragment>
            )}
            {filterAct.length > 0 ? (
              <Fragment>
                {filterAct.map((data, index) => (
                  <CardActiDept
                    act={data}
                    onDelete={onDeleteAct}
                    userRole={userRole}
                  />
                ))}
              </Fragment>
            ) : (
              <Fragment>
                <div>ไม่พบกิจกรรมที่ค้นหา</div>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Fragment>
            {activity.length > 0 ? (
              <Fragment>
                {activity.map((data, index) => (
                  <Fragment>
                    <CardActiDept
                      act={data}
                      onDelete={onDeleteAct}
                      userRole={userRole}
                    />
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              <Fragment>ไม่มีกิจกกรม</Fragment>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

ActivityDept.getLayout = function getLayout(page) {
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
