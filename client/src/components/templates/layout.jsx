import { Fragment } from "react";
import Header from "../components/header";
import Aside from "../components/aside";




export default function Layout({ children }) {
    return (
        <Fragment>
            <section className="main-layout">
                <Header />
                <Aside />
                <main className="main-content">{children}</main>
            </section>
        </Fragment>
    )
}