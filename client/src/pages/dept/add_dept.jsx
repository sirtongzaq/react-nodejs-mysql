import { Fragment, useState } from "react";
import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import depService from "@/services/deptservice";
import AddDeptForm from "@/components/components/adddept_form";
import toastNoti from "@/components/components/toast";
import { useRouter } from "next/router";

export default function AddDept() {
  const router = useRouter();
  const handleSubmit = async (e, deptName) => {
    const body = {
      dept_name: deptName,
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
