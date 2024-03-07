import Layout from "@/components/templates/layout";
import AuthLayout from "@/components/templates/authLayout";
import { Fragment, useEffect, useState } from "react";
import authService from "@/services/authservice";
import LoginForm from "@/components/components/login_from";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const handleLogin = async (e, username, password) => {
    e.preventDefault();
    try {
      await authService.userLoginWithUsernamePassword({
        username,
        password,
      });
      getToken();
    } catch (error) {
      console.log("Invalid username or password");
    }
  };

  const getToken = async () => {
    const token = await authService.getTokenFromUser();
    setToken(token);
  };

  const logout = async () => {
    await authService.removeTokenFromUser();
    getToken();
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <Fragment>
      <h1>Token : {token}</h1>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
      <LoginForm handleLogin={handleLogin} />
    </Fragment>
  );
}

LoginPage.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
