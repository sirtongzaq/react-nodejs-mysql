import MeasuresService from "@/services/measuresservice";
import { Fragment, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function InputNewRow({ data, handleValue, field }) {
  const [newValueOption, setNewValueOption] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [dataArr, setDataArr] = useState([]);

  const handleInputChage = (value) => {
    setNewValueOption(value);
  };

  const handleSelectChange = (selectValue) => {
    setSelectValue(selectValue);
    handleValue(selectValue?.value, field);
  };

  const handleCreate = () => {
    if (newValueOption.trim() !== "") {
      setSelectValue({ value: newValueOption, label: newValueOption });
      handleValue(newValueOption, field);
    } else {
      console.log("กรุณากรอกข้อมูล");
    }
  };

  useEffect(() => {
    setDataArr(data);
  }, [data]);

//   useEffect(() => {
//     console.log("dataArr", dataArr);
//   }, [dataArr]);

  return (
    <Fragment>
      <div>
        <CreatableSelect
          isClearable
          options={dataArr}
          onInputChange={handleInputChage}
          onChange={handleSelectChange}
          onCreateOption={handleCreate}
          value={selectValue}
          required
        />
      </div>
    </Fragment>
  );
}
