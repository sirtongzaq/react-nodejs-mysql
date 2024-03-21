import { Fragment, useEffect, useState } from "react";
import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import depService from "@/services/deptservice";
import AddDeptForm from "@/components/components/adddept_form";
import toastNoti from "@/components/components/toast";
import { useRouter } from "next/router";

export default function AddDept() {
  const router = useRouter();
  const [deptId, setDeptId] = useState(0);
  const getDeptLength = async () => {
    try {
      const res = await depService.getDep();
      if (res.length) {
        const lastIndex = res.length - 1;
        const lastData = res[lastIndex];
        const deptIdFilter = lastData.dept_id + 1;
        setDeptId(deptIdFilter);
      } else {
        setDeptId(1);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleSubmit = async (e, deptName) => {
    const body = {
      dept_name: deptName,
      dept_id: deptId,
    };
    e.preventDefault();
    try {
      await depService.createDep(body);
      toastNoti.toastsuccess("สร้างแผนกสำเร็จ");
      setTimeout(() => {
        router.push("/dept");
      }, 2000);
    } catch (e) {
      console.log("error", e);
      toastNoti.toasterror("Department name already taken");
    }
  };

  useEffect(() => {
    getDeptLength();
  }, []);

  return (
    <Fragment>
      <AddDeptForm handleSubmit={handleSubmit} />
    </Fragment>
  );
}

AddDept.getLayout = function getLayout(page) {
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
