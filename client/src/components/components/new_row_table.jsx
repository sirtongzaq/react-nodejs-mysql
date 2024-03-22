import { Fragment, useState, useEffect } from "react";
import InputNewRow from "./input_new_row";
import { toast } from "react-toastify";
import toastNoti from "./toast";

export default function NewRowTable({
  handleDataTable,
  onTableData,
  actId,
  onCloseModal,
  dataInActApproveDestroy,
  dataInActConditionNameAccess,
  dataInActConditionToAccess,
  dataInActHowToAccess,
  dataInActLegalBase,
  dataInActName,
  dataInActNameAccess,
  dataInActObject,
  dataInActSource,
  dataInActStorage,
  dataInActSubject,
  dataInActTimePeriod,
  dataInActType,
  dataInActTypeDetail,
  dataInActWayDestroy,
  dataInActWhouseInorg,
  dataInActWhouseOutorg,
}) {
  const [tableData, setTableData] = useState(onTableData);
  const [formDataTable, setFormDataTable] = useState([
    {
      act_id: actId,
      p_data_name: "",
      p_data_subject: "",
      p_data_source: "",
      p_data_type_detail: "",
      p_data_type: "",
      p_data_object: "",
      p_data_legal_base: "",
      p_data_time_period: "",
      p_data_storage: "",
      p_data_name_access: "",
      p_data_condition_name_access: "",
      p_data_how_to_access: "",
      p_data_condition_to_access: "",
      p_data_whouse_inorg: "",
      p_data_whouse_outorg: "",
      p_data_way_destroy: "",
      p_data_approve_destroy: "",
    },
  ]);


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormData = [...formDataTable];
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormDataTable(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormEmpty = formDataTable.some((data) => {
      return Object.values(data).some(value => typeof value === 'string' && value.trim() === '');
    });

    if (isFormEmpty) {
      toastNoti.toasterror("กรุณากรอกให้ข้อมูลให้ครบทุกช่อง")
      return; // Exit early if form is not valid
    }
    setTableData([...tableData, ...formDataTable]);
    setFormDataTable([
      {
        act_id: actId,
        p_data_name: "",
        p_data_subject: "",
        p_data_source: "",
        p_data_type_detail: "",
        p_data_type: "",
        p_data_object: "",
        p_data_legal_base: "",
        p_data_time_period: "",
        p_data_storage: "",
        p_data_name_access: "",
        p_data_condition_name_access: "",
        p_data_how_to_access: "",
        p_data_condition_to_access: "",
        p_data_whouse_inorg: "",
        p_data_whouse_outorg: "",
        p_data_way_destroy: "",
        p_data_approve_destroy: "",
      },
    ]);
  };


  const onDataInAct = (value, name) => {
    if (value) {
      setFormDataTable((prevState) => {
        const newData = prevState.map((row) => {
          if (row.hasOwnProperty(name)) {
            return { ...row, [name]: value };
          }
          return row;
        });
        return newData;
      });
    } else {
      console.log("noDataMeasure");
    }
  };

  useEffect(() => {
    handleDataTable(tableData);
  }, [tableData]);

  useEffect(() => {
    onCloseModal();
  }, [handleDataTable]);

  return (
    <Fragment>
      {formDataTable.map((formData, index) => (
        <form
          key={index}
          onSubmit={(e) => handleSubmit(e, index)}
          className="add-new-row-form"
        >
          <div className="add-new-row-form-card">
            <label>
              ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)
              {/* <input
                type="text"
                name="p_data_name"
                value={formData.p_data_name}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)"
                maxLength={1000}
                required
              /> */}
              <InputNewRow
                data={dataInActName}
                handleValue={onDataInAct}
                field={"p_data_name"}
              />
            </label>

            <label>
              เจ้าของข้อมูลส่วนบุคคล
              {/* <input
                type="text"
                name="p_data_subject"
                value={formData.p_data_subject}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="เจ้าของข้อมูลส่วนบุคคล"
              /> */}
              <InputNewRow
                data={dataInActSubject}
                handleValue={onDataInAct}
                field={"p_data_subject"}
              />
            </label>

            <label>
              ได้รับข้อมูลจาก
              {/* <input
                type="text"
                name="p_data_source"
                value={formData.p_data_source}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="ได้รับข้อมูลจาก"
              /> */}
              <InputNewRow
                data={dataInActSource}
                handleValue={onDataInAct}
                field={"p_data_source"}
              />
            </label>

            <label>
              รูปแบบของข้อมูล
              {/* <input
                type="text"
                name="p_data_type"
                value={formData.p_data_type}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="รูปแบบของข้อมูล"
              /> */}
              <InputNewRow
                data={dataInActType}
                handleValue={onDataInAct}
                field={"p_data_type"}
              />
            </label>

            <label>
              ประเภทข้อมูลส่วนบุคคล
              {/* <input
                type="text"
                name="p_data_type_detail"
                value={formData.p_data_type_detail}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="ประเภทข้อมูลส่วนบุคคล"
              /> */}
              <InputNewRow
                data={dataInActTypeDetail}
                handleValue={onDataInAct}
                field={"p_data_type_detail"}
              />
            </label>
            <label>
              วัตถุประสงค์การเก็บรวบรวมข้อมูล
              {/* <input
                type="text"
                name="p_data_object"
                value={formData.p_data_object}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="วัตถุประสงค์การเก็บรวบรวมข้อมูล"
              /> */}
              <InputNewRow
                data={dataInActObject}
                handleValue={onDataInAct}
                field={"p_data_object"}
              />
            </label>

            <label>
              ฐานทางกฎหมายสำหรับประมวลผลข้อมูลส่วนบุคคล
              {/* <input
                type="text"
                name="p_data_legal_base"
                value={formData.p_data_legal_base}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="ฐานทางกฎหมายสำหรับประมวลผลข้อมูลส่วนบุคคล"
              /> */}
              <InputNewRow
                data={dataInActLegalBase}
                handleValue={onDataInAct}
                field={"p_data_legal_base"}
              />
            </label>

            <label>
              ระยะเวลาการจัดเก็บข้อมูลส่วนบุคค
              {/* <input
                type="text"
                name="p_data_time_period"
                value={formData.p_data_time_period}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="ระยะเวลาการจัดเก็บข้อมูลส่วนบุคค"
              /> */}
              <InputNewRow
                data={dataInActTimePeriod}
                handleValue={onDataInAct}
                field={"p_data_time_period"}
              />
            </label>

            <label>
              แหล่งจัดเก็บข้อมูลส่วนบุคคล
              {/* <input
                type="text"
                name="p_data_storage"
                value={formData.p_data_storage}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="แหล่งจัดเก็บข้อมูลส่วนบุคคล"
              /> */}
              <InputNewRow
                data={dataInActStorage}
                handleValue={onDataInAct}
                field={"p_data_storage"}
              />
            </label>

            <label>
              บุคคลที่มีสิทธิเข้าถึงข้อมูล
              {/* <input
                type="text"
                name="p_data_name_access"
                value={formData.p_data_name_access}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="บุคคลที่มีสิทธิเข้าถึงข้อมูล"
              /> */}
              <InputNewRow
                data={dataInActNameAccess}
                handleValue={onDataInAct}
                field={"p_data_name_access"}
              />
            </label>

            <label>
              เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล
              {/* <input
                type="text"
                name="p_data_condition_name_access"
                value={formData.p_data_condition_name_access}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล"
              /> */}
              <InputNewRow
                data={dataInActConditionNameAccess}
                handleValue={onDataInAct}
                field={"p_data_condition_name_access"}
              />
            </label>

            <label>
              วิธีการเข้าถึงข้อมูลส่วนบุคคล
              {/* <input
                type="text"
                name="p_data_how_to_access"
                value={formData.p_data_how_to_access}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="วิธีการเข้าถึงข้อมูลส่วนบุคคล"
              /> */}
              <InputNewRow
                data={dataInActHowToAccess}
                handleValue={onDataInAct}
                field={"p_data_how_to_access"}
              />
            </label>

            <label>
              เงื่อนไขในการเข้าถึงข้อมูล
              {/* <input
                type="text"
                name="p_data_condition_to_access"
                value={formData.p_data_condition_to_access}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="เงื่อนไขในการเข้าถึงข้อมูล"
              /> */}
              <InputNewRow
                data={dataInActConditionToAccess}
                handleValue={onDataInAct}
                field={"p_data_condition_to_access"}
              />
            </label>

            <label>
              ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง
              {/* <input
                type="text"
                name="p_data_whouse_inorg"
                value={formData.p_data_whouse_inorg}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง"
              /> */}
              <InputNewRow
                data={dataInActWhouseInorg}
                handleValue={onDataInAct}
                field={"p_data_whouse_inorg"}
              />
            </label>

            <label>
              ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเผยให้ใครบ้าง
              {/* <input
                type="text"
                name="p_data_whouse_outorg"
                value={formData.p_data_whouse_outorg}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเผยให้ใครบ้าง"
              /> */}
              <InputNewRow
                data={dataInActWhouseOutorg}
                handleValue={onDataInAct}
                field={"p_data_whouse_outorg"}
              />
            </label>

            <label>
              วิธีการทำลายข้อมูลส่วนบุคคล
              {/* <input
                type="text"
                name="p_data_way_destroy"
                value={formData.p_data_way_destroy}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="วิธีการทำลายข้อมูลส่วนบุคคล"
              /> */}
              <InputNewRow
                data={dataInActWayDestroy}
                handleValue={onDataInAct}
                field={"p_data_way_destroy"}
              />
            </label>

            <label>
              ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ
              {/* <input
                type="text"
                name="p_data_approve_destroy"
                value={formData.p_data_approve_destroy}
                onChange={(e) => handleInputChange(e, index)}
                placeholder="ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ"
              /> */}
              <InputNewRow
                data={dataInActApproveDestroy}
                handleValue={onDataInAct}
                field={"p_data_approve_destroy"}
              />
            </label>

            <button type="submit" className="add-new-row-submit-btn">
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      ))}
    </Fragment>
  );
}
