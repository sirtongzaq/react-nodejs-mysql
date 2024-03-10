import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";

export default function Page() {
  return <div>test</div>;
}

Page.getLayout = function getLayout(page) {
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
