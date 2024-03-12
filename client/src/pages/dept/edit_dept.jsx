import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditDept() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <h1>Edit Department {id}</h1>
    </>
  );
}

EditDept.getLayout = function getLayout(page) {
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
