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
            <textarea
              type="text"
              rows={5}
              name="p_data_name"
              value={formData.p_data_name}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)"
              required
            />
          </label>

          <label>
            เจ้าของข้อมูลส่วนบุคคล
            <textarea
              type="text"
              name="p_data_subject"
              rows={5}
              value={formData.p_data_subject}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="เจ้าของข้อมูลส่วนบุคคล"
              required
            />
          </label>

          <label>
            ได้รับข้อมูลจาก
            <textarea
              type="text"
              name="p_data_source"
              rows={5}
              value={formData.p_data_source}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ได้รับข้อมูลจาก"
              required
            />
          </label>

          <label>
            รูปแบบของข้อมูล
            <textarea
              type="text"
              name="p_data_type"
              value={formData.p_data_type}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="รูปแบบของข้อมูล"
              required
            />
          </label>

          <label>
            ประเภทข้อมูลส่วนบุคคล
            <textarea
              type="text"
              name="p_data_type_detail"
              value={formData.p_data_type_detail}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ประเภทข้อมูลส่วนบุคคล"
              required
            />
          </label>
          <label>
            วัตถุประสงค์การเก็บรวบรวมข้อมูล
            <textarea
              type="text"
              name="p_data_object"
              value={formData.p_data_object}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="วัตถุประสงค์การเก็บรวบรวมข้อมูล"
              required
            />
          </label>

          <label>
            ฐานทางกฎหมายสำหรับประมวลผลข้อมูลส่วนบุคคล
            <textarea
              type="text"
              name="p_data_legal_base"
              value={formData.p_data_legal_base}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ฐานทางกฎหมายสำหรับประมวลผลข้อมูลส่วนบุคคล"
              required
            />
          </label>

          <label>
            ระยะเวลาการจัดเก็บข้อมูลส่วนบุคค
            <textarea
              type="text"
              name="p_data_time_period"
              value={formData.p_data_time_period}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ระยะเวลาการจัดเก็บข้อมูลส่วนบุคค"
              required
            />
          </label>

          <label>
            แหล่งจัดเก็บข้อมูลส่วนบุคคล
            <textarea
              type="text"
              name="p_data_storage"
              value={formData.p_data_storage}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="แหล่งจัดเก็บข้อมูลส่วนบุคคล"
              required
            />
          </label>

          <label>
            บุคคลที่มีสิทธิเข้าถึงข้อมูล
            <textarea
              type="text"
              name="p_data_name_access"
              value={formData.p_data_name_access}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="บุคคลที่มีสิทธิเข้าถึงข้อมูล"
              required
            />
          </label>

          <label>
            เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล
            <textarea
              type="text"
              name="p_data_condition_name_access"
              value={formData.p_data_condition_name_access}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล"
              required
            />
          </label>

          <label>
            วิธีการเข้าถึงข้อมูลส่วนบุคคล
            <textarea
              type="text"
              name="p_data_how_to_access"
              value={formData.p_data_how_to_access}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="วิธีการเข้าถึงข้อมูลส่วนบุคคล"
              required
            />
          </label>

          <label>
            เงื่อนไขในการเข้าถึงข้อมูล
            <textarea
              type="text"
              name="p_data_condition_to_access"
              value={formData.p_data_condition_to_access}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="เงื่อนไขในการเข้าถึงข้อมูล"
              required
            />
          </label>

          <label>
            ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง
            <textarea
              type="text"
              name="p_data_whouse_inorg"
              value={formData.p_data_whouse_inorg}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง"
              required
            />
          </label>

          <label>
            ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเผยให้ใครบ้าง
            <textarea
              type="text"
              name="p_data_whouse_outorg"
              value={formData.p_data_whouse_outorg}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเผยให้ใครบ้าง"
              required
            />
          </label>

          <label>
            วิธีการทำลายข้อมูลส่วนบุคคล
            <textarea
              type="text"
              name="p_data_way_destroy"
              value={formData.p_data_way_destroy}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="วิธีการทำลายข้อมูลส่วนบุคคล"
              style={{ height: "auto" }}
              required
            />
          </label>

          <label>
            ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ
            <textarea
              type="text"
              name="p_data_approve_destroy"
              value={formData.p_data_approve_destroy}
              rows={5}
              onChange={(e) => handleInputChange(e, index)}
              placeholder="ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ"
              required
            />
          </label>

          <button type="submit" className="add-new-row-submit-btn">บันทึกข้อมูล</button>
        </div>
      </form>
    ))}
  </Fragment>)
}