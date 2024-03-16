import { Fragment, useState, useEffect } from "react";

export default function NewRowTable({ handleDataTable, onTableData, actId }) {
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

  useEffect(() => {
    console.log("tableData", tableData);
    handleDataTable(tableData);
  }, [tableData]);

  return (
    <Fragment>
      {formDataTable.map((formData, index) => (
        <form key={index} onSubmit={(e) => handleSubmit(e, index)}>
          <input
            type="text"
            name="p_data_name"
            value={formData.p_data_name}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_name"
            required
          />
          <input
            type="text"
            name="p_data_subject"
            value={formData.p_data_subject}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_subject"
          />
          <input
            type="text"
            name="p_data_source"
            value={formData.p_data_source}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_source"
          />
          <input
            type="text"
            name="p_data_type"
            value={formData.p_data_type}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_type"
          />
          <input
            type="text"
            name="p_data_type_detail"
            value={formData.p_data_type_detail}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_type_detail"
          />
          <input
            type="text"
            name="p_data_object"
            value={formData.p_data_object}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_object"
          />
          <input
            type="text"
            name="p_data_legal_base"
            value={formData.p_data_legal_base}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_legal_base"
          />
          <input
            type="text"
            name="p_data_time_period"
            value={formData.p_data_time_period}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_time_period"
          />
          <input
            type="text"
            name="p_data_storage"
            value={formData.p_data_storage}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_storage"
          />
          <input
            type="text"
            name="p_data_name_access"
            value={formData.p_data_name_access}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_name_access"
          />
          <input
            type="text"
            name="p_data_condition_name_access"
            value={formData.p_data_condition_name_access}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_condition_name_access"
          />
          <input
            type="text"
            name="p_data_how_to_access"
            value={formData.p_data_how_to_access}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_how_to_access"
          />
          <input
            type="text"
            name="p_data_condition_to_access"
            value={formData.p_data_condition_to_access}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_condition_to_access"
          />
          <input
            type="text"
            name="p_data_whouse_inorg"
            value={formData.p_data_whouse_inorg}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_whouse_inorg"
          />
          <input
            type="text"
            name="p_data_whouse_outorg"
            value={formData.p_data_whouse_outorg}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_whouse_outorg"
          />
          <input
            type="text"
            name="p_data_way_destroy"
            value={formData.p_data_way_destroy}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_way_destroy"
          />
          <input
            type="text"
            name="p_data_approve_destroy"
            value={formData.p_data_approve_destroy}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="p_data_approve_destroy"
          />
          <button type="submit">Add Data</button>
        </form>
      ))}
    </Fragment>
  );
}
