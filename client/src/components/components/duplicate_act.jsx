import actService from "@/services/actservice";
import dataInActService from "@/services/datainactservice";
import MeasuresService from "@/services/measuresservice";
import React, { Fragment, useEffect, useState } from "react";
import toastNoti from "./toast";
import { useRouter } from "next/router";

export default function DuplAct({ handleCancel, act }) {
  const router = useRouter();
  const [actData, setActData] = useState("");
  const [dataInAct, setDataInAct] = useState("");
  const [measData, setMeasData] = useState("");
  const [actId, setActId] = useState("");
  const [ready, setReady] = useState(false);
  const [allActData, setAllActData] = useState("");
  const [numberOfSimilarNames, setNumberOfSimilarNames] = useState(0);
  const submitData = async () => {
    try {
      //   console.log("actData", actData);
      await actService.createAct(actData);
      for (let i of dataInAct) {
        // console.log("dataInAct", i);
        await dataInActService.createDataInAct(i);
      }
      for (let i of measData) {
        // console.log("measData", i);
        await MeasuresService.createMeasures(i);
      }
      toastNoti.toastsuccess("เพิ่มกิจกรรมสำเร็จ");
      handleCancel();
      setTimeout(() => {
        router.reload();
      }, 2000);
    } catch (e) {
      console.log("error", e);
      toastNoti.toasterror("เพิ่มกิจกรรมไม่สำเร็จ");
    }
  };

  const getDataInActById = async () => {
    try {
      const resLength = await dataInActService.getDataInAct();
      const lastIndex = resLength.length - 1;
      const lastData = resLength[lastIndex];
      const dataInActId = lastData.data_id + 1;
      const actIdDefualt = act.act_id;
      const res = await dataInActService.getDataInActFromActId(actIdDefualt);
      const updatedDataInAct = res.map((item, index) => ({
        ...item,
        data_id: dataInActId + index,
        act_id: actId,
      }));
      setDataInAct(updatedDataInAct);
      setTimeout(() => {
        setReady(true);
      }, 1500);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getMeasById = async () => {
    try {
      const resLength = await MeasuresService.getMeasures();
      const lastIndex = resLength.length - 1;
      const lastData = resLength[lastIndex];
      const measeId = lastData.meas_id + 1;
      const actIdDefualt = act.act_id;
      const res = await MeasuresService.getMeasuresFromActId(actIdDefualt);
      const updatedMeas = res.map((item, index) => ({
        ...item,
        meas_id: measeId + index,
        act_id: actId,
      }));
      setMeasData(updatedMeas);
    } catch (e) {
      console.log("error", e);
    }
  };

  const mapSimilarActName = async () => {
    const newData = actData.act_name;

    const similarNameCounts = [];

    allActData.forEach((item) => {
      if (item.act_name.includes(newData)) {
        similarNameCounts[item.act_name] =
          (similarNameCounts[item.act_name] || 0) + 1;
      }
    });

    const numberOfSimilarNames = Object.keys(similarNameCounts).length;
    setNumberOfSimilarNames(numberOfSimilarNames);
  };

  const getActLength = async () => {
    try {
      const res = await actService.getAct();
      const lastIndex = res.length - 1;
      const lastData = res[lastIndex];
      const actIdFilter = lastData.act_id + 1;
      setActId(actIdFilter);
      setAllActData(res);
    } catch (e) {
      console.log("error", e);
    }
  };

  //   useEffect(() => {
  //     console.log("actData", actData);
  //     console.log("dataInAct", dataInAct);
  //     console.log("measData", measData);
  //   }, [measData]);

  useEffect(() => {
    if (numberOfSimilarNames > 0) {
      setActData((prevState) => ({
        ...prevState,
        act_id: actId,
        act_name: `${actData?.act_name} (${numberOfSimilarNames})`,
      }));
    }
  }, [numberOfSimilarNames]);

  useEffect(() => {
    if (allActData.length > 0) {
      mapSimilarActName();
    }
    setActData((prevState) => ({
      ...prevState,
      act_id: actId,
    }));
    getDataInActById();
    getMeasById();
  }, [actId]);

  useEffect(() => {
    setActData(act);
    getActLength();
  }, [act]);

  return (
    <Fragment>
      <span>คุณต้องทำข้อมูลซ้ำกิจกรรม {actData.act_name} </span>
      <div className="box-modal-button">
        {ready == true ? (
          <div
            onClick={() => {
              submitData();
            }}
            className="box-modal-delete-button"
            style={{
              background: "#001769",
              color: "#fff",
            }}
          >
            ทำข้อมูลซ้ำ
          </div>
        ) : (
          <div class="three-body">
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
            <div class="three-body__dot"></div>
          </div>
        )}
        <div
          onClick={() => {
            handleCancel();
          }}
          className="box-modal-cancel-button"
        >
          ยกเลิก
        </div>
      </div>
    </Fragment>
  );
}
