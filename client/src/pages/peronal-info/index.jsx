import PersonalTable from "@/components/components/personal_table";
import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

export default function PersonalInfo() {
  const [userToken, setUserToken] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState([]);
  const router = useRouter();

  const getUserFromToken = async (userToken) => {
    const res = await authService.getUserFromToken(userToken);
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
    setUserRole(user?.user?.user_role);
  }, [user]);

  useEffect(() => {
    if (userRole === "User" || userRole === "Editor") {
      router.push("/");
    }
  }, [userRole]);

  return (
    <Fragment>
      <div className="personal-contrianer">
        <PersonalTable></PersonalTable>
      </div>
    </Fragment>
  );
}

PersonalInfo.getLayout = function getLayout(page) {
  const getUserByToken = async (token) => {
    try {
      const response = await authService.getUserFromToken(token);
      return response;
    } catch (e) {
      console.log("error", e);
    }
  };
  return <Layout getUserByToken={getUserByToken}>{page}</Layout>;
};
