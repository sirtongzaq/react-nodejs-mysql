import Layout from "@/components/templates/layout"
import { useRouter } from "next/router"
import { Fragment } from "react"

export default function Dept(){
    const router = useRouter()
    return (
    <Fragment>
        <div onClick={() => router.push('/dept/add_dept')} className="test">
            go add page
        </div>
    </Fragment>
    )
}

// Dept.getLayout = function getLayout(page) {
//     return (
//       <Layout>
//         {page}
//       </Layout>
//     )
//   }