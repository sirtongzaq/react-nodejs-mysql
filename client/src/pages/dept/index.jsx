import CardDept from "@/components/components/card_dept";
import SearchDept from "@/components/components/search_dept";
import Layout from "@/components/templates/layout";
import authService from "@/services/authservice";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

export default function Dept() {
  const router = useRouter();
  const [dept, setDept] = useState([]);
  const [filterDept, setFilterDept] = useState([]);

  const onChageSearch = () => {};

  const onChangeDeptList = (value) => {
    setFilterDept(value);
  };

  return (
    <Fragment>
      <div onClick={() => router.push("/dept/add_dept")} className="">
        add page
      </div>
      <div className="dept-page-search">
        <SearchDept onChangeDeptList={onChangeDeptList} />
      </div>
      <div className="dept-list">
        {/* {filterDept.map(()=>(
                <Fragment>
                    <CardDept/>
                </Fragment>))} */}
        <CardDept />
      </div>
    </Fragment>
  );
}

Dept.getLayout = function getLayout(page) {
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
