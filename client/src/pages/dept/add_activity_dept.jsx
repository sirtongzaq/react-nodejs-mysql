import ActInfoTable from "@/components/components/acitivity_info_table";
import ActMeasure from "@/components/components/activity_measure";
import AddActInfoForm from "@/components/components/add_act_info_form";
import toastNoti from "@/components/components/toast";
import Layout from "@/components/templates/layout";
import actService from "@/services/actservice";
import authService from "@/services/authservice";
import depService from "@/services/deptservice";
import MeasuresService from "@/services/measuresservice";
import { useRouter } from "next/router";
import { Fragment, use, useEffect, useState } from "react";

export default function AddActDept() {
  const router = useRouter();
  const { id } = router.query;
  const [dept, setDept] = useState([]);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState(null);
  const [measure, setMeasure] = useState([])
  const [actId, setId] = useState("")
  const [orMeasure, setOrMeasure] = useState([])
  const [techMeasure, setTechMearue] = useState([])
  const [phyMeasure, setPhyMearue] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    lscache.set(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await actService.createAct(formData);
      console.log(response.data);
      toastNoti.toastsuccess("Activity create succesfuly");
    } catch (error) {
      console.error("Error submitting form:", error);
      toastNoti.toasterror("Activity create fail");
    }
  };

  const getDept = async () => {
    try {
      const res = await depService.getDepFromId(id);
      setDept(res);
    } catch (e) {
      setDept([]);
    }
  };
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handlePrevFrom = (formData) => {
    setFormData(formData)
  }

  const onPageChange = (formData) => {
    setFormData(formData)
  }

  const getMeasure = async () => {
    try {
      const res = await MeasuresService.getMeasures()
      setMeasure(res)
    } catch (e) {
      setMeasure([])
      console.log(e)
    }
  }

  const filterOr = () => {
    const option = []
    measure.map((ele) => {
      const opt =
      {
        value: ele.meas_org,
        label: ele.meas_org
      }

      option.push(opt)
    }
    )
    setOrMeasure(option)
  }

  const filtertech = () => {
    const option = []
    measure .map((ele) => {
      const opt =
      {
        value: ele.meas_technical,
        label: ele.meas_technical
      }

      option.push(opt)
    }
    )
    setTechMearue(option)
  }


  const filterPhy = () => {
    const option = []
    measure.map((ele) => {
      const opt =
      {
        value: ele.meas_physic,
        label: ele.meas_physic
      }

      option.push(opt)
    }
    )
    setPhyMearue(option)
  }



  useEffect(() => {
    console.log("formData", formData)
  }, [formData])

  useEffect(() => {
    setFormData(formData)
  }, [formData])

  useEffect(() => {
    if (page == 0) {
      router.back()
    } else if (page > 3) {
      setPage(page - 1)
    }
  }, [page]);

  useEffect(() => {
    getDept();
    getMeasure()
  }, [id]);

  useEffect(()=>{
    console.log(measure)
    filterOr()
    filtertech()
    filterPhy()
  },[measure])

  return (
    <Fragment>
      {page === 1 && <AddActInfoForm dept={dept} handleSubmit={handleSubmit} currPage={page} handlePrevFrom={handlePrevFrom} />}
      {page == 2 && (
        <Fragment>
          <div className="actTable">
            <ActInfoTable formData={formData} onPageChange={onPageChange} currPage={page} ></ActInfoTable>
          </div>
        </Fragment>)}
      {page == 3 && (
        <Fragment>
          <div className="">
            <ActMeasure measure={orMeasure}></ActMeasure>
            <ActMeasure measure={techMeasure}></ActMeasure>
            <ActMeasure measure={phyMeasure}></ActMeasure>
          </div>
        </Fragment>)}

      <div className="flex-row">
        <button
          className="btn-submit-activity"
          type="submit"
          onClick={prevPage}
        >
          กลับ
        </button>
        {page != 3 ? (<button
          className="btn-submit-activity"
          type="submit"
          form="add-dept-form"
          onClick={nextPage}
        >
          ถัดไป
        </button>) : (<Fragment></Fragment>)}
      </div>
    </Fragment>
  );
}

AddActDept.getLayout = function getLayout(page) {
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
