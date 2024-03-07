import { Fragment } from "react";
import Header from "./templates/header";


export default function Layout({ children }) {
    return (
        <Fragment>
            <Header /><main>{children}</main>
        </Fragment>
    )
}