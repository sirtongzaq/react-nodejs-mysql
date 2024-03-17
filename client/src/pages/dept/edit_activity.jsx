import AddActInfoForm from "@/components/components/add_act_info_form";
import Layout from "@/components/templates/layout";
import actService from "@/services/actservice";
import authService from "@/services/authservice";
import dataInActService from "@/services/datainactservice";
import MeasuresService from "@/services/measuresservice";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

export default function EditAct() {
  const router = useRouter();
  const { id } = router.query;


  const [act,setAct] = useState([])
  const [infoAct,setInfoAct] = useState([])
  const [measureAct,setMeasureAct] =useState([]) 


  const getActbyId = async () => {
    try{
      const res =await actService.getActFromId(id)
      console.log("act",res)
      setAct(res)
    }catch(err){
      setAct([])
      console.log(err)
    }
  }

  const getInfoActbyId = async () => {
    try{
      const res =await dataInActService.getDataInActFromActId(id)
      console.log("test",res)
      // setAct(res)
    }catch(err){
      setInfoAct([])
      console.log(err)
    }
  }

  const getMeasureActbyId = async () => {
    try{
      const res =await MeasuresService.getMeasuresFromActId(id)
      console.log("mes",res)
      // setAct(res)
    }catch(err){
      setMeasureAct([])
      console.log(err)
    }
  }




  useEffect(()=>{
    getActbyId()
    getInfoActbyId()
    getMeasureActbyId()
  },[id])

  return (
    <Fragment>
      <div>
        <span>
          กิจกรรม
        </span>
        <div>
          
        </div>
      </div>


    </Fragment>


  );
}

EditAct.getLayout = function getLayout(page) {
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
