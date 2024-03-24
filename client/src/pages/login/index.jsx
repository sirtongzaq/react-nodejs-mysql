import Layout from "@/components/templates/layout";
import AuthLayout from "@/components/templates/authLayout";
import { Fragment, useEffect, useState } from "react";
import authService from "@/services/authservice";
import LoginForm from "@/components/components/login_form";
import { useRouter } from "next/router";
import toastNoti from "@/components/components/toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const handleRegister = () => {
    router.push("/register");
  };

  const handleLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      const res = await authService.userLoginWithUsernamePassword({
        username,
        password,
      });
      setUserToken(res.token);
    } catch (error) {
      toastNoti.toasterror("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  const getUserFromToken = async (userToken) => {
    try {
      const res = await authService.getUserFromToken(userToken);
      setUser(res);
    } catch (error) {
      console.error("Failed to fetch user from token:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    if (userToken !== null) {
      getUserFromToken(userToken);
    }
  }, [userToken]);

  useEffect(() => {
    if (user?.user?.user_role === "Waiting") {
      toastNoti.toasterror(
        "Role ผู้ใช้ของคุณถูกตั้งเป็น Waiting กรุณาติดต่อเจ้าหน้าที่เพื่อขอความช่วยเหลือเพิ่มเติม"
      );
    } else if (user !== null) {
      router.push("/dept");
    }
  }, [user]);

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
