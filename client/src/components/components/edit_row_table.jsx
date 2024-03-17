import { Fragment, useEffect, useState } from "react";

export default function EditRowTable({ editTableData, onChangeDataTable }) {
  const [tableData, setTableData] = useState(editTableData);
  const [formDataTable, setFormDataTable] = useState([
    {
      // act_id: actId,
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
    const updatedFormData = [...formDataTable]
    updatedFormData[index] = { ...updatedFormData[index], [name]: value };
    setFormDataTable(updatedFormData);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      onChangeDataTable(...formDataTable)
      // setFormDataTable([
      //     {
      //         // act_id: actId,
      //         p_data_name: "",
      //         p_data_subject: "",
      //         p_data_source: "",
      //         p_data_type_detail: "",
      //         p_data_type: "",
      //         p_data_object: "",
      //         p_data_legal_base: "",
      //         p_data_time_period: "",
      //         p_data_storage: "",
      //         p_data_name_access: "",
      //         p_data_condition_name_access: "",
      //         p_data_how_to_access: "",
      //         p_data_condition_to_access: "",
      //         p_data_whouse_inorg: "",
      //         p_data_whouse_outorg: "",
      //         p_data_way_destroy: "",
      //         p_data_approve_destroy: "",
      //     },
      // ]);
  };


  useEffect(() => {
    setTableData(editTableData)
  }, [editTableData])


  useEffect(() => {
    setFormDataTable(tableData)
  }, [tableData]);




  return (<Fragment>
    {formDataTable.map((formData, index) => (
      <form key={index} onSubmit={(e) => handleSubmit(e, index)} className="add-new-row-form">
        <div className="add-new-row-form-card">
          <label>ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)
            <input
              type="text"
              name="p_data_name"
              value={formData.p_data_name}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)"
              required
            />
          </label>

          <label>
            เจ้าของข้อมูลส่วนบุคคล
            <input
              type="text"
              name="p_data_subject"
              value={formData.p_data_subject}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="เจ้าของข้อมูลส่วนบุคคล"
            />
          </label>

          <label>
            ได้รับข้อมูลจาก
            <input
              type="text"
              name="p_data_source"
              value={formData.p_data_source}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ได้รับข้อมูลจาก"
            />
          </label>

          <label>
            รูปแบบของข้อมูล
            <input
              type="text"
              name="p_data_type"
              value={formData.p_data_type}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="รูปแบบของข้อมูล"
            />
          </label>

          <label>
            ประเภทข้อมูลส่วนบุคคล
            <input
              type="text"
              name="p_data_type_detail"
              value={formData.p_data_type_detail}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ประเภทข้อมูลส่วนบุคคล"
            />
          </label>
          <label>
            วัตถุประสงค์การเก็บรวบรวมข้อมูล
            <input
              type="text"
              name="p_data_object"
              value={formData.p_data_object}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="วัตถุประสงค์การเก็บรวบรวมข้อมูล"
            />
          </label>

          <label>
            ฐานทางกฎหมายสำหรับประมวลผลข้อมูลส่วนบุคคล
            <input
              type="text"
              name="p_data_legal_base"
              value={formData.p_data_legal_base}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ฐานทางกฎหมายสำหรับประมวลผลข้อมูลส่วนบุคคล"
            />
          </label>

          <label>
            ระยะเวลาการจัดเก็บข้อมูลส่วนบุคค
            <input
              type="text"
              name="p_data_time_period"
              value={formData.p_data_time_period}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ระยะเวลาการจัดเก็บข้อมูลส่วนบุคค"
            />
          </label>

          <label>
            แหล่งจัดเก็บข้อมูลส่วนบุคคล
            <input
              type="text"
              name="p_data_storage"
              value={formData.p_data_storage}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="แหล่งจัดเก็บข้อมูลส่วนบุคคล"
            />
          </label>

          <label>
            บุคคลที่มีสิทธิเข้าถึงข้อมูล
            <input
              type="text"
              name="p_data_name_access"
              value={formData.p_data_name_access}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="บุคคลที่มีสิทธิเข้าถึงข้อมูล"
            />
          </label>

          <label>
            เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล
            <input
              type="text"
              name="p_data_condition_name_access"
              value={formData.p_data_condition_name_access}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล"
            />
          </label>

          <label>
            วิธีการเข้าถึงข้อมูลส่วนบุคคล
            <input
              type="text"
              name="p_data_how_to_access"
              value={formData.p_data_how_to_access}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="วิธีการเข้าถึงข้อมูลส่วนบุคคล"
            />
          </label>

          <label>
            เงื่อนไขในการเข้าถึงข้อมูล
            <input
              type="text"
              name="p_data_condition_to_access"
              value={formData.p_data_condition_to_access}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="เงื่อนไขในการเข้าถึงข้อมูล"
            />
          </label>

          <label>
            ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง
            <input
              type="text"
              name="p_data_whouse_inorg"
              value={formData.p_data_whouse_inorg}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง"
            />
          </label>

          <label>
            ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเผยให้ใครบ้าง
            <input
              type="text"
              name="p_data_whouse_outorg"
              value={formData.p_data_whouse_outorg}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเผยให้ใครบ้าง"
            />
          </label>

          <label>
            วิธีการทำลายข้อมูลส่วนบุคคล
            <input
              type="text"
              name="p_data_way_destroy"
              value={formData.p_data_way_destroy}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="วิธีการทำลายข้อมูลส่วนบุคคล"
            />
          </label>

          <label>
            ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ
            <input
              type="text"
              name="p_data_approve_destroy"
              value={formData.p_data_approve_destroy}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ"
            />
          </label>

          <button type="submit" className="add-new-row-submit-btn">บันทึกข้อมูล</button>
        </div>
      </form>
    ))}
  </Fragment>)
}