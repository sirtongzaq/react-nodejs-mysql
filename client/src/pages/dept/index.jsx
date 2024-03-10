import CardDept from "@/components/components/card_dept"
import SearchDept from "@/components/components/search_dept"
import Layout from "@/components/templates/layout"
import { useRouter } from "next/router"
import { Fragment, useState } from "react"

export default function Dept() {
    const router = useRouter()
    const [dept, setDept] = useState([])
    const [filterDept, setFilterDept] = useState([])

    const onChageSearch = () => {

    }

    const onChangeDeptList = (value) => {
        setFilterDept(value)
    }

    return (
        <Fragment>

            <div className="dept-add-search">
                <div className="dept-search-container">
                    <SearchDept onChangeDeptList={onChangeDeptList} />
                </div>
                <div onClick={() => router.push('/dept/add_dept')} className="dept-add-container">
                    add page
                </div>
            </div>
            <div className="dept-list">
                {/* {filterDept.map(()=>(
                <Fragment>
                    <CardDept/>
                </Fragment>))} */}
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