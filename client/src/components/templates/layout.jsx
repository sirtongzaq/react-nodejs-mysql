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
    if (res) {
      setUser(res);
    } else {
      setUser("noUser");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUserToken(token);
      getUserFromToken(token);
    }
  }, [userToken]);

  useEffect(() => {
    if (user === "noUser") {
      localStorage.removeItem("token");
      router.push("/login");
    } else if (user && user.userExp) {
      if (user?.user?.user_role == "Waiting") {
        localStorage.removeItem("token");
        router.push("/login");
      }
      const expirationTime = user.userExp * 1000;
      const currentTime = Date.now();
      const timeDifference = expirationTime - currentTime;
      if (timeDifference > 0) {
        const timeout = setTimeout(() => {
          localStorage.removeItem("token");
          router.push("/login");
        }, timeDifference);
        return () => clearTimeout(timeout);
      } else {
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  }, [user]);

  return (
    <Fragment>
      <section className="main-layout">
        <Header logout={logout} user={user} />
        {/* <Aside /> */}
        <main className="main-content">{children}</main>
      </section>
    </Fragment>
  );
}
