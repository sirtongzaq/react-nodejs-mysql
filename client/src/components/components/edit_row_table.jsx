import { Fragment, useEffect, useState } from "react";

export default function EditRowTable({onTableData}) {
    const [tableData, setTableData] = useState(onTableData);
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


    return (<Fragment>
        HI
    </Fragment>)
}