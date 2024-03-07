import { Fragment } from "react";

export default function AuthLayout({ children }) {
    return (
        <Fragment>
            <main>{children}</main>
        </Fragment>
    )
}