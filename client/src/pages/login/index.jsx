import Layout from "@/components/templates/layout";
import AuthLayout from "@/components/templates/authLayout";
import { Fragment, useEffect, useState } from "react";
import authService from "@/services/authservice";
import LoginForm from "@/components/components/login_from";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      await authService.userLoginWithUsernamePassword({
        username,
        password,
      });
      router.push("/");
    } catch (error) {
      console.log("Invalid username or password");
    }
  };

  return (
    <Fragment>
      <LoginForm handleLogin={handleLogin} />
    </Fragment>
  );
}

LoginPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
