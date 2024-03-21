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
  const handleRegister = async (
    e,
    username,
    password,
    user_email,
    user_firstname,
    user_lastname
  ) => {
    e.preventDefault();
    try {
      await authService.userRegisterWithUsernamePassword({
        username,
        password,
        user_email,
        user_firstname,
        user_lastname,
      });
      toastNoti.toastsuccess("สมัครสมาชิกสำเร็จ");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toastNoti.toasterror("ชื่อผู้ใช้ถูกใช้แล้ว");
    }
  };

  return (
    <Fragment>
      <div className="bg-login">
        <RegisterForm
          handleRegister={handleRegister}
          handleBack={handleBack}
          error={toastNoti.toasterror}
        />
      </div>
    </Fragment>
  );
}

RegisterPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
