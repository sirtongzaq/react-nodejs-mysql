import Layout from "@/components/templates/layout";
import AuthLayout from "@/components/templates/authLayout";
import { Fragment } from "react";

export default function LoginPage() {
    return (
        <Fragment>
            <h1>
                Login
            </h1>
        </Fragment>
    )
}

LoginPage.getLayout = function getLayout(page) {
    return (
      <AuthLayout>
        {page}
      </AuthLayout>
    )
  }