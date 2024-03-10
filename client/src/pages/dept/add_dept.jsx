import { Fragment, useState } from "react";
import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import depService from "@/services/depservice";
import AddDeptForm from "@/components/components/adddept_from";
import toastNoti from "@/components/components/toast";

export default function AddDept() {
  const handleSubmit = async (e, depName) => {
    const body = {
      depname: depName,
    };
    e.preventDefault();
    try {
      await depService.createDep(body);
      toastNoti.toastsuccess("Department create successfully");
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
