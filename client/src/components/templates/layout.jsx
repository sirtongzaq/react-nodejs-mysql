import { Fragment } from "react";
import Header from "../components/header";
import Aside from "../components/aside";




export default function Layout({ children }) {
    return (
        <Fragment>
            <Header />
            <Aside> <main>{children}</main></Aside>
        </Fragment>
    )
}