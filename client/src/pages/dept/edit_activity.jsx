import ActInfoTable from "@/components/components/acitivity_info_table";
import ActMeasure from "@/components/components/activity_measure";
import AddActInfoForm from "@/components/components/add_act_info_form";
import EditActForm from "@/components/components/edit_act_form";
import EditActMeasure from "@/components/components/edit_activity_measure";
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


  const [act, setAct] = useState([])
  const [infoAct, setInfoAct] = useState([])
  const [measureAct, setMeasureAct] = useState([])
  const [allMeasure, setAllMeasure] = useState([])
  const [orMeasure, setOrMeasure] = useState([]);
  const [techMeasure, setTechMearue] = useState([]);
  const [phyMeasure, setPhyMearue] = useState([]);


  const getActbyId = async () => {
    try {
      const res = await actService.getActFromId(id)
      // console.log(res)
      setAct([res])
    } catch (err) {
      setAct([])
      console.log(err)
    }
  }

  const getInfoActbyId = async () => {
    try {
      const res = await dataInActService.getDataInActFromActId(id)
      setInfoAct(res)
    } catch (err) {
      setInfoAct([])
      console.log(err)
    }
  }


  const getAllMeasure = async () => {
    try {
      const res = await MeasuresService.getMeasures()
      setAllMeasure(res)
    } catch (err) {
      setAllMeasure([])
      console.log(err)
    }
  }

  const getMeasureActbyId = async () => {
    try {
      const res = await MeasuresService.getMeasuresFromActId(id)
      setMeasureAct(res)
    } catch (err) {
      setMeasureAct([])
      console.log(err)
    }
  }


  const onChangeDataTable = (value) => {
    if (value) {
      setInfoAct(value);
    } else {
      console.log("noDataTable");
    }
  };


  const filterOr = () => {
    const option = [];
    const uniqueValues = [];

    allMeasure.map((ele) => {
      const opt = {
        value: ele.meas_org,
        label: ele.meas_org,
      };
      if (!uniqueValues.includes(ele.meas_org)) {
        option.push(opt);
        uniqueValues.push(ele.meas_org);
      }
    });

    setOrMeasure(option);
  };

  const filterTech = () => {
    const option = [];
    const uniqueValues = [];

    allMeasure.map((ele) => {
      const opt = {
        value: ele.meas_technical,
        label: ele.meas_technical,
      };
      if (!uniqueValues.includes(ele.meas_technical)) {
        option.push(opt);
        uniqueValues.push(ele.meas_technical);
      }
    });

    setTechMearue(option);
  };

  const filterPhy = () => {
    const option = [];
    const uniqueValues = [];

    allMeasure.map((ele) => {
      const opt = {
        value: ele.meas_physic,
        label: ele.meas_physic,
      };
      if (!uniqueValues.includes(ele.meas_technical)) {
        option.push(opt);
        uniqueValues.push(ele.meas_technical);
      }
    });
    setPhyMearue(option);
  };


  const onDataMeasure = (value, name) => {
    if (value) {
      const indexToUpdate = 0
      if (indexToUpdate !== -1) {
        setMeasureAct(prevState => {
          const updatedMeasureAct = [...prevState];
          updatedMeasureAct[indexToUpdate] = {
            ...updatedMeasureAct[indexToUpdate],
            meas_org: value
          };
          return updatedMeasureAct;
        });
      } else {
        console.log("Object not found in measureAct array.");
      }
    } else {
      console.log("No data provided for updating measureAct.");
    }
  };


  useEffect(() => {
    if (id) {
      getActbyId()
      getInfoActbyId()
      getAllMeasure()
      getMeasureActbyId()
    }
  }, [id])

  useEffect(() => {
    filterOr()
    filterTech()
    filterPhy()
  }, [allMeasure])

  useEffect(() => {
    console.log("act", measureAct)
  }, [measureAct])

  return (
    <Fragment>
      <div>
        <span>
          กิจกรรม
        </span>
        <div>
          <EditActForm act={act}></EditActForm>
        </div>
        <span>
          รายละเอียดข้อมูลส่วนบุคคล
        </span>
        <div>
          <ActInfoTable newData={infoAct} onNewData={onChangeDataTable} />
        </div>
        <div>
          <span>มาตรการเชิงองค์กร (Organizational Measures)</span>
          <EditActMeasure measure={orMeasure} handleValue={onDataMeasure} data={measureAct[0]?.meas_org} field={"meas_org"} />

          <span>มาตรการเชิงเทคนิค (Technical Measures)</span>
          <EditActMeasure measure={techMeasure} handleValue={onDataMeasure} data={measureAct[0]?.meas_technical} field={"meas_technical"} />

          <span>มาตรการทางกายภาพ (Physical Measures)</span>
          <EditActMeasure measure={phyMeasure} handleValue={onDataMeasure} data={measureAct[0]?.meas_physic} field={"meas_physic"} />
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
