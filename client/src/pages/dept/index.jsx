import CardDept from "@/components/components/card_dept"
import Layout from "@/components/templates/layout"
import { useRouter } from "next/router"
import { Fragment } from "react"

export default function Dept() {
    const router = useRouter()
    return (
        <Fragment>
            <div onClick={() => router.push('/dept/add_dept')} className="">
                add page
            </div>
            <div>
                input
            </div>
            <div className="dept-list">
                <CardDept />
            </div>
        </Fragment>
    )
}

Dept.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}