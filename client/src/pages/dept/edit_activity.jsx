import ActInfoTable from "@/components/components/acitivity_info_table";
import ActMeasure from "@/components/components/activity_measure";
import AddActInfoForm from "@/components/components/add_act_info_form";
import EditActForm from "@/components/components/edit_act_form";
import EditActMeasure from "@/components/components/edit_activity_measure";
import modalStyle from "@/components/components/modalstyle";
import NewRowTable from "@/components/components/new_row_table";
import toastNoti from "@/components/components/toast";
import Layout from "@/components/templates/layout";
import actService from "@/services/actservice";
import authService from "@/services/authservice";
import dataInActService from "@/services/datainactservice";
import MeasuresService from "@/services/measuresservice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

export default function EditAct() {
  const router = useRouter();
  const { id } = router.query;
  const [act, setAct] = useState([]);
  const [actForm, setActform] = useState([]);
  const [removeTableDataArr, setRemoveTableDataArr] = useState([]);
  const [infoAct, setInfoAct] = useState([]);
  const [measureAct, setMeasureAct] = useState([]);
  const [allMeasure, setAllMeasure] = useState([]);
  const [orMeasure, setOrMeasure] = useState([]);
  const [techMeasure, setTechMearue] = useState([]);
  const [phyMeasure, setPhyMearue] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [dataInActApproveDestroy, setDataInActApproveDestroy] = useState([]);
  const [dataInActConditionNameAccess, setDataInActConditionNameAccess] =
    useState([]);
  const [dataInActConditionToAccess, setDataInActConditionToAccess] = useState(
    []
  );
  const [dataInActHowToAccess, setDataInActHowToAccess] = useState([]);
  const [dataInActLegalBase, setDataInActLegalBase] = useState([]);
  const [dataInActName, setDataInActName] = useState([]);
  const [dataInActNameAccess, setDataInActNameAccess] = useState([]);
  const [dataInActObject, setDataInActObject] = useState([]);
  const [dataInActSource, setDataInActSource] = useState([]);
  const [dataInActStorage, setDataInActStorage] = useState([]);
  const [dataInActSubject, setDataInActSubject] = useState([]);
  const [dataInActTimePeriod, setDataInActTimePeriod] = useState([]);
  const [dataInActType, setDataInActType] = useState([]);
  const [dataInActTypeDetail, setDataInActTypeDetail] = useState([]);
  const [dataInActWayDestroy, setDataInActWayDestroy] = useState([]);
  const [dataInActWhouseInorg, setDataInActWhouseInorg] = useState([]);
  const [dataInActWhouseOutorg, setDataInActWhouseOutorg] = useState([]);
  const [user, setUser] = useState([]);
  const [userRole, setUserRole] = useState("");

  const getUserFromToken = async (userToken) => {
    const res = await authService.getUserFromToken(userToken);
    if (res) {
      setUser(res);
    } else {
      setUser("noUser");
    }
  };

  const submitData = async () => {
    try {
      for (let i of actForm) {
        const body_act = {
          id: i.act_id,
          newData: i,
        };
        await actService.updateAct(body_act);
      }
      for (let i of infoAct) {
        const data_id = i.data_id;
        if (data_id) {
          const body_dia = {
            id: data_id,
            newData: i,
          };
          try {
            await dataInActService.updateDataInAct(body_dia);
          } catch (error) {
            console.error("Error updating data:", error);
          }
        } else {
          try {
            await dataInActService.createDataInAct(i);
          } catch (error) {
            console.error("Error creating data:", error);
          }
        }
      }
      for (let i of measureAct) {
        const body_meas = {
          id: i.meas_id,
          newData: i,
        };
        await MeasuresService.updateMeasures(body_meas);
      }
      for (let i of removeTableDataArr) {
        if (i !== undefined) {
          await dataInActService.delDataInActFromId(i);
        } else {
          console.log("removeTableDataArrNotInDB");
        }
      }
      toastNoti.toastsuccess("อัปเดทข้อมูลสำเร็จ");
      setTimeout(() => {
        router.push("/dept");
      }, 2000);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getActbyId = async () => {
    try {
      const res = await actService.getActFromId(id);
      // console.log(res)
      setAct([res]);
    } catch (err) {
      setAct([]);
      console.log(err);
    }
  };

  const getInfoActbyId = async () => {
    try {
      const res = await dataInActService.getDataInActFromActId(id);
      setInfoAct(res);
    } catch (err) {
      setInfoAct([]);
      console.log(err);
    }
  };

  const getAllMeasure = async () => {
    try {
      const res = await MeasuresService.getMeasures();
      setAllMeasure(res);
    } catch (err) {
      setAllMeasure([]);
      console.log(err);
    }
  };

  const getMeasureActbyId = async () => {
    try {
      const res = await MeasuresService.getMeasuresFromActId(id);
      setMeasureAct(res);
    } catch (err) {
      setMeasureAct([]);
      console.log(err);
    }
  };

  const onDeleteDataTable = (value) => {
    if (value) {
      setRemoveTableDataArr(value);
    } else {
      console.log("noDataTable");
    }
  };

  const onChangeDataTable = (value) => {
    if (value) {
      setInfoAct(value);
    } else {
      console.log("noDataTable");
    }
  };

  const onChangeDataAct = (value) => {
    if (value) {
      setActform(value);
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
      if (!uniqueValues.includes(ele.meas_physic)) {
        option.push(opt);
        uniqueValues.push(ele.meas_physic);
      }
    });
    setPhyMearue(option);
  };

  const filterDataInActApproveDestroy = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_approve_destroy,
        label: ele.p_data_approve_destroy,
      };
      if (!uniqueValues.includes(ele.p_data_approve_destroy)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_approve_destroy);
      }
    });
    setDataInActApproveDestroy(option);
  };

  const filterDataInActConditionNameAccess = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_condition_name_access,
        label: ele.p_data_condition_name_access,
      };
      if (!uniqueValues.includes(ele.p_data_condition_name_access)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_condition_name_access);
      }
    });

    setDataInActConditionNameAccess(option);
  };

  const filterDataInActConditionToAccess = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_condition_to_access,
        label: ele.p_data_condition_to_access,
      };
      if (!uniqueValues.includes(ele.p_data_condition_to_access)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_condition_to_access);
      }
    });

    setDataInActConditionToAccess(option);
  };

  const filterDataInActHowToAccess = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_how_to_access,
        label: ele.p_data_how_to_access,
      };
      if (!uniqueValues.includes(ele.p_data_how_to_access)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_how_to_access);
      }
    });

    setDataInActHowToAccess(option);
  };

  const filterDataInActLegalBase = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_legal_base,
        label: ele.p_data_legal_base,
      };
      if (!uniqueValues.includes(ele.p_data_legal_base)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_legal_base);
      }
    });

    setDataInActLegalBase(option);
  };

  const filterDataInActName = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_name,
        label: ele.p_data_name,
      };
      if (!uniqueValues.includes(ele.p_data_name)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_name);
      }
    });

    setDataInActName(option);
  };

  const filterDataInActNameAccess = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_name_access,
        label: ele.p_data_name_access,
      };
      if (!uniqueValues.includes(ele.p_data_name_access)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_name_access);
      }
    });

    setDataInActNameAccess(option);
  };

  const filterDataInActObject = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_object,
        label: ele.p_data_object,
      };
      if (!uniqueValues.includes(ele.p_data_object)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_object);
      }
    });

    setDataInActObject(option);
  };

  const filterDataInActSource = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_source,
        label: ele.p_data_source,
      };
      if (!uniqueValues.includes(ele.p_data_source)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_source);
      }
    });

    setDataInActSource(option);
  };

  const filterDataInActStorage = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_storage,
        label: ele.p_data_storage,
      };
      if (!uniqueValues.includes(ele.p_data_storage)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_storage);
      }
    });

    setDataInActStorage(option);
  };

  const filterDataInActSubject = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_subject,
        label: ele.p_data_subject,
      };
      if (!uniqueValues.includes(ele.p_data_subject)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_subject);
      }
    });

    setDataInActSubject(option);
  };

  const filterDataInActTimePeriod = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_time_period,
        label: ele.p_data_time_period,
      };
      if (!uniqueValues.includes(ele.p_data_time_period)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_time_period);
      }
    });

    setDataInActTimePeriod(option);
  };

  const filterDataInActType = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_type,
        label: ele.p_data_type,
      };
      if (!uniqueValues.includes(ele.p_data_type)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_type);
      }
    });

    setDataInActType(option);
  };

  const filterDataInActTypeDetail = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_type_detail,
        label: ele.p_data_type_detail,
      };
      if (!uniqueValues.includes(ele.p_data_type_detail)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_type_detail);
      }
    });

    setDataInActTypeDetail(option);
  };

  const filterDataInActWayDestroy = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_way_destroy,
        label: ele.p_data_way_destroy,
      };
      if (!uniqueValues.includes(ele.p_data_way_destroy)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_way_destroy);
      }
    });

    setDataInActWayDestroy(option);
  };

  const filterDataInActWhouseInorg = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_whouse_inorg,
        label: ele.p_data_whouse_inorg,
      };
      if (!uniqueValues.includes(ele.p_data_whouse_inorg)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_whouse_inorg);
      }
    });

    setDataInActWhouseInorg(option);
  };

  const filterDataInActWhouseOutorg = () => {
    const option = [];
    const uniqueValues = [];

    infoAct.forEach((ele) => {
      const opt = {
        value: ele.p_data_whouse_outorg,
        label: ele.p_data_whouse_outorg,
      };
      if (!uniqueValues.includes(ele.p_data_whouse_outorg)) {
        option.push(opt);
        uniqueValues.push(ele.p_data_whouse_outorg);
      }
    });

    setDataInActWhouseOutorg(option);
  };

  const onDataTable = (value) => {
    if (value) {
      setInfoAct(value);
    } else {
      console.log("noDataTable");
    }
  };

  const onDataMeasure = (value, name) => {
    if ((value, name)) {
      const indexToUpdate = 0;
      if (indexToUpdate !== -1) {
        setMeasureAct((prevState) => {
          const updatedMeasureAct = [...prevState];
          updatedMeasureAct[indexToUpdate] = {
            ...updatedMeasureAct[indexToUpdate],
            [name]: value,
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

  const onCloseModal = () => {
    setOpenModalCreate((prev) => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      getUserFromToken(token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const userRole = user?.user?.user_role;
      setUserRole(userRole);
    } else {
      router.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (id) {
      getActbyId();
      getInfoActbyId();
      getAllMeasure();
      getMeasureActbyId();
    }
  }, [id]);

  useEffect(() => {
    filterOr();
    filterTech();
    filterPhy();
  }, [allMeasure]);

  useEffect(() => {
    filterDataInActApproveDestroy();
    filterDataInActConditionNameAccess();
    filterDataInActConditionToAccess();
    filterDataInActHowToAccess();
    filterDataInActLegalBase();
    filterDataInActName();
    filterDataInActNameAccess();
    filterDataInActObject();
    filterDataInActSource();
    filterDataInActStorage();
    filterDataInActSubject();
    filterDataInActTimePeriod();
    filterDataInActType();
    filterDataInActTypeDetail();
    filterDataInActWayDestroy();
    filterDataInActWhouseInorg();
    filterDataInActWhouseOutorg();
  }, [infoAct]);

  return (
    <Fragment>
      <div className="edit-activity-container">
        <h1>รายละเอียดกิจกรรม</h1>
        <div>
          <EditActForm
            act={act}
            handleChangeData={onChangeDataAct}
            userRole={userRole}
          ></EditActForm>
        </div>
        <h1>รายละเอียดข้อมูลส่วนบุคคล</h1>
        <div className="add-table-button">
          <button
            className="btn-submit-activity"
            style={{
              marginBottom: "25px",
              float: "right",
              display: userRole === "User" ? "none" : "block",
            }}
            onClick={() => {
              setOpenModalCreate(!openModalCreate);
            }}
          >
            เพิ่มแถว
            <span style={{ marginLeft: "5px" }}>
              <FontAwesomeIcon icon={SolidIcon.faPlus} />
            </span>
          </button>
        </div>
        <div className="edit-table-contrainer">
          <Modal open={openModalCreate}>
            <Box sx={modalStyle.boxAddStyle}>
              <button
                onClick={() => {
                  onCloseModal();
                }}
                className="close-button-new-role"
              >
                X
              </button>
              <NewRowTable
                dataInActApproveDestroy={dataInActApproveDestroy}
                dataInActConditionNameAccess={dataInActConditionNameAccess}
                dataInActConditionToAccess={dataInActConditionToAccess}
                dataInActHowToAccess={dataInActHowToAccess}
                dataInActLegalBase={dataInActLegalBase}
                dataInActName={dataInActName}
                dataInActNameAccess={dataInActNameAccess}
                dataInActObject={dataInActObject}
                dataInActSource={dataInActSource}
                dataInActStorage={dataInActStorage}
                dataInActSubject={dataInActSubject}
                dataInActTimePeriod={dataInActTimePeriod}
                dataInActType={dataInActType}
                dataInActTypeDetail={dataInActTypeDetail}
                dataInActWayDestroy={dataInActWayDestroy}
                dataInActWhouseInorg={dataInActWhouseInorg}
                dataInActWhouseOutorg={dataInActWhouseOutorg}
                handleDataTable={onDataTable}
                onCloseModal={onCloseModal}
                onTableData={infoAct}
                actId={id}
              />
            </Box>
          </Modal>
          <ActInfoTable
            newData={infoAct}
            onNewData={onChangeDataTable}
            handleDeleteIdTable={onDeleteDataTable}
            userRole={userRole}
          />
        </div>
        <div className="edit-measure-contrainer">
          <div style={{ marginBlock: "20px" }}>
            <h1>รายละเอียดมาตรการของกิจกรรม</h1>
            <span>มาตรการเชิงองค์กร (Organizational Measures)</span>
            <EditActMeasure
              measure={orMeasure}
              handleValue={onDataMeasure}
              data={measureAct[0]?.meas_org}
              field={"meas_org"}
              userRole={userRole}
            />
          </div>

          <div style={{ marginBlock: "20px" }}>
            <span>มาตรการเชิงเทคนิค (Technical Measures)</span>
            <EditActMeasure
              measure={techMeasure}
              handleValue={onDataMeasure}
              data={measureAct[0]?.meas_technical}
              field={"meas_technical"}
              userRole={userRole}
            />
          </div>

          <div style={{ marginBlock: "20px"}}>
            <span>มาตรการทางกายภาพ (Physical Measures)</span>
            <EditActMeasure
              measure={phyMeasure}
              handleValue={onDataMeasure}
              data={measureAct[0]?.meas_physic}
              field={"meas_physic"}
              userRole={userRole}
            />
          </div>

        </div>
        <div className="flex-row">
          <button
            className="btn-submit-activity"
            onClick={() => {
              router.back();
            }}
          >
            กลับ
          </button>
          <button
            className="btn-submit-activity"
            style={{ display: userRole === "User" ? "none" : "block" }}
            onClick={() => {
              submitData();
            }}
          >
            บันทึก
          </button>
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
