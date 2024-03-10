import Layout from "@/components/templates/layout";
import AuthLayout from "@/components/templates/authLayout";
import { Fragment, useEffect, useState } from "react";
import authService from "@/services/authservice";
import { useRouter } from "next/router";
import RegisterForm from "@/components/components/register_form";
import toastNoti from "@/components/components/toast";

export default function RegisterPage() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const handleRegister = async (e, username, password) => {
    e.preventDefault();
    try {
      await authService.userRegisterWithUsernamePassword({
        username,
        password,
      });
      toastNoti.toastsuccess("Account registered successfully");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toastNoti.toasterror("Username is already taken");
    }
  };

  return (
    <Fragment>
      <RegisterForm
        handleRegister={handleRegister}
        handleBack={handleBack}
        error={toastNoti.toasterror}
      />
    </Fragment>
  );
}

RegisterPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
