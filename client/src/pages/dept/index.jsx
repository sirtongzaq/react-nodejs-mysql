import CardDept from "@/components/components/card_dept";
import SearchDept from "@/components/components/search_dept";
import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import depService from "@/services/depservice";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastsuccess = (text) =>
  toast.success(text, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

const toasterror = (text) =>
  toast.error(text, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export default function Dept() {
  const router = useRouter();
  const [dept, setDept] = useState([]);
  const [filterDept, setFilterDept] = useState([]);
  const [onSearch, setOnSearch] = useState(false);

  const onChangeDeptList = (value) => {
    if (value === "") {
      setFilterDept([]);
      setOnSearch(false);
    } else {
      setOnSearch(true);
      const filteredDepartments = dept.filter((department) =>
        department.dep_name.toLowerCase().includes(value.toLowerCase())
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
      toastsuccess("Delete dep successfuly");
    } catch (e) {
      console.log("error", e);
      toasterror(e);
    }
  };

  useEffect(() => {
    getDep();
    setOnSearch(false);
  }, []);

  useEffect(() => {
    console.log("dep", dept);
  }, [dept]);
  // useEffect(() => {
  //   console.log("f", filterDept);
  // }, [filterDept]);
  // useEffect(() => {
  //   console.log("ons", onSearch);
  // }, [onSearch]);

  return (
    <Fragment>
      <div onClick={() => router.push("/dept/add_dept")} className="">
        add page
      </div>
      <div className="dept-page-search">
        <SearchDept onChangeDeptList={onChangeDeptList} />
      </div>
      <div className="dept-list">
        {onSearch == true ? (
          <>
            {filterDept.length > 0 ? (
              filterDept.map((d) => (
                <p key={d.id}>
                  <CardDept
                    dep_name={d.dep_name}
                    handleDel={() => {
                      delDep(d.id);
                    }}
                  />
                </p>
              ))
            ) : (
              <p>no data search</p>
            )}
          </>
        ) : (
          <>
            {dept.length > 0 ? (
              dept.map((d) => (
                <p key={d.id}>
                  <CardDept
                    dep_name={d.dep_name}
                    handleDel={() => delDep(d.id)}
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
