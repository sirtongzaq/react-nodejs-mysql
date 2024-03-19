import Layout from "@/components/templates/layout";
import AuthLayout from "@/components/templates/authLayout";
import { Fragment, useEffect, useState } from "react";
import authService from "@/services/authservice";
import LoginForm from "@/components/components/login_form";
import { useRouter } from "next/router";
import toastNoti from "@/components/components/toast";

export default function LoginPage() {
  const router = useRouter();
  const handleRegister = () => {
    router.push("/register");
  };
  const handleLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      await authService.userLoginWithUsernamePassword({
        username,
        password,
      });
      router.push("/peronal-info");
    } catch (error) {
      toastNoti.toasterror("Invalid username or password");
    }
  };

  return (
    <Fragment>
      <div className="bg-login">
        <LoginForm handleLogin={handleLogin} handleRegister={handleRegister} />
      </div>
    </Fragment>
  );
}

LoginPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
