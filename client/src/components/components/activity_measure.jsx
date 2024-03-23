import MeasuresService from "@/services/measuresservice";
import { Fragment, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

export default function ActMeasure({ measure, handleValue, field }) {
  const [newValueOption, setNewValueOption] = useState("");
  const [selectValue, setSelectValue] = useState([]);
  const [measureArr, setMeasureArr] = useState([]);

  const handleInputChage = (value) => {
    setNewValueOption(value);
  };

  const handleSelectChange = (selectValue) => {
    setSelectValue(selectValue);
    handleValue(selectValue?.value, field);
  };

  const handleCreate = () => {
    if (newValueOption.trim() !== "") {
      // เช็คว่า newValueOption ไม่เป็นค่าว่างหรือไม่

      setSelectValue({ value: newValueOption, label: newValueOption });
      handleValue(newValueOption, field);
    }
  };

  useEffect(() => {
    setMeasureArr(measure);
    setSelectValue([]);
  }, [measure]);

  // useEffect(()=>{
  //     filterOr()
  //     filtertech()
  //     filterPhy()
  // },[measureArr])

  return (
    <Fragment>
      <div className="measure-contriner">
        <CreatableSelect
          isClearable
          options={measureArr}
          onInputChange={handleInputChage}
          onChange={handleSelectChange}
          onCreateOption={handleCreate}
          value={selectValue}
          required={true}
        />
      </div>
    </Fragment>
  );
}
