import MeasuresService from "@/services/measuresservice";
import { Fragment, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function ActMeasure({ measure, handleValue, field }) {
  const [measureOptions, setMeasureOptions] = useState(options);
  const [newValueOption, setNewValueOption] = useState("");
  const [selectValue, setSelectValue] = useState({});
  const [measureArr, setMeasureArr] = useState([]);

  const handleInputChage = (value) => {
    console.log(value.toLowerCase().replace(/\W/g, ""));
    setNewValueOption(value);
  };

  const handleSelectChange = (selectValue) => {
    console.log("selectValue", selectValue);
    setSelectValue(selectValue);
    handleValue(selectValue.value, field);
  };

  const handleCreate = () => {
    const newOPtion = setMeasureOptions((prev) => [
      ...prev,
      { value: newValueOption, label: newValueOption },
    ]);
    console.log(newOPtion, "newOprin");
    setSelectValue({ value: newValueOption, label: newValueOption });
    handleValue(newValueOption, field);
  };

  useEffect(() => {
    setMeasureArr(measure);
  }, [measure]);

  // useEffect(()=>{
  //     filterOr()
  //     filtertech()
  //     filterPhy()
  // },[measureArr])

  useEffect(() => {
    console.log(selectValue);
  }, [selectValue]);
  return (
    <Fragment>
      <div>
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
