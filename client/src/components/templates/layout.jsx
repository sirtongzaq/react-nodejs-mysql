import { Fragment, useEffect, useState } from "react";
import Header from "../components/header";
import Aside from "../components/aside";
import { useRouter } from "next/router";
export default function Layout({ children, getUserByToken }) {
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState("");
  const router = useRouter();

  const logout = async () => {
    localStorage.removeItem("token");
    router.reload();
  };

  const getUserFromToken = async (userToken) => {
    const res = await getUserByToken(userToken);
    setUser(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUserToken(token);
      getUserFromToken(userToken);
    }
  }, [userToken]);

  useEffect(() => {
    if (user === null) {
      localStorage.removeItem("token");
      router.push("/login");
    } else {
      const expirationTime = user?.userExp * 1000;
      const currentTime = Date.now();
      const timeDifference = expirationTime - currentTime;
      if (timeDifference) {
        setTimeout(() => {
          localStorage.removeItem("token");
          router.push("/login");
        }, timeDifference);
      }
    }
  }, [user]);

  return (
    <Fragment>
      <section className="main-layout">
        <Header logout={logout} user={user} />
        <Aside />
        <main className="main-content">{children}</main>
      </section>
    </Fragment>
  );
}
