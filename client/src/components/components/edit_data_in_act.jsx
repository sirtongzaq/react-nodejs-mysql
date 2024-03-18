import { Fragment, useEffect } from "react";

export default function EditDataInAct({data}) {
    const [dataInActArr,setDataInActArr] = ([])

    useEffect(()=>{
        setDataInActArr(data)
    },[data])

    return (
    <Fragment>
            
    </Fragment>)
}