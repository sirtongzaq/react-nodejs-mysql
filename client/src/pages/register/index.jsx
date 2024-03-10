import Layout from "@/components/templates/layout";
import AuthLayout from "@/components/templates/authLayout";
import { Fragment, useEffect, useState } from "react";
import authService from "@/services/authservice";
import { useRouter } from "next/router";
import RegisterForm from "@/components/components/register_form";
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
      toastsuccess("Account registered successfully");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      toasterror("Username is already taken");
    }
  };

  return (
    <Fragment>
      <ToastContainer />;
      <RegisterForm
        handleRegister={handleRegister}
        handleBack={handleBack}
        error={toasterror}
      />
    </Fragment>
  );
}

RegisterPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
