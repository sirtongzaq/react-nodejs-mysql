import MeasuresService from "@/services/measuresservice";
import { Fragment, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

export default function EditActMeasure({ measure, handleValue, field, data }) {
  const [newValueOption, setNewValueOption] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [measureArr, setMeasureArr] = useState([]);

  const handleInputChage = (value) => {
    setNewValueOption(value);
  };

  const handleSelectChange = (selectValue) => {
    setSelectValue(selectValue);
    handleValue(selectValue?.value, field);
  };

  const handleCreate = () => {
    setSelectValue({ value: newValueOption, label: newValueOption });
    handleValue(newValueOption, field);
  };

  useEffect(() => {
    setSelectValue({ value: data, label: data });
  }, [data]);

  useEffect(() => {
    setMeasureArr(measure);
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
        />
      </div>
    </Fragment>
  );
}
