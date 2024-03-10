import Layout from "@/components/templates/layout";
import AuthLayout from "@/components/templates/authLayout";
import { Fragment, useEffect, useState } from "react";
import authService from "@/services/authservice";
import LoginForm from "@/components/components/login_from";
import { useRouter } from "next/router";
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
      router.push("/");
    } catch (error) {
      toasterror("Invalid username or password");
    }
  };

  return (
    <Fragment>
      <LoginForm
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        error={toasterror}
      />
    </Fragment>
  );
}

LoginPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
