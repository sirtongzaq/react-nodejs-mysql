import MeasuresService from "@/services/measuresservice";
import { Fragment, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import toastNoti from "./toast";

export default function ActMeasure({ measure, handleValue, field }) {
  const [newValueOption, setNewValueOption] = useState("");
  // const [selectValue, setSelectValue] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [measureArr, setMeasureArr] = useState([]);
  const [isShowDropDown, setIsShowDropDown] = useState(false)

  // const handleInputChage = (value) => {
  //   setNewValueOption(value);
  // };

  const handleSelectChange = (selectValue) => {
    setSelectValue(selectValue);
    handleValue(selectValue, field);
    // handleValue(selectValue?.value, field);
    setIsShowDropDown(false)
  };


  // const handleTextareaChange = (event) => {
  //   setSelectValue({ value: event.target.value, label: event.target.value });
  //   handleValue(event.target.value, field);
  // };

  // const handleCreate = () => {
  //   if (newValueOption.trim() !== "") {
  //     setSelectValue({ value: newValueOption, label: newValueOption });
  //     handleValue(newValueOption, field);
  //   }
  // };

  const onBlurClick = () => {
    setIsShowDropDown(false)
  }

  const onFocusClick = () => {
    setIsShowDropDown(true)
  }


  const handleTextareaChange = (event) => {
    const { value } = event.target;
    setSelectValue(value);
    handleValue(value, field);

  };

  useEffect(() => {
    console.log(",e", measure)
    setMeasureArr(measure);
    // setSelectValue([]);
  }, [measure]);


  // useEffect(() => {
  //   if (selectValue) {
  //     setNewValueOption(selectValue.value);
  //     console.log(selectValue)
  //   }
  // }, [selectValue]);

  return (
    <Fragment>
      {/* <div className="measure-contriner">
        <CreatableSelect
          isClearable
          options={measureArr}
          onInputChange={handleInputChage}
          onChange={handleSelectChange}
          onCreateOption={handleCreate}
          value={selectValue}
          required={true}
        />
      </div> */}

      <div>
        <div className="text-area-dropdown-btn">
          <textarea name="" id="" cols="30" rows="10" value={selectValue} onClick={onFocusClick} onChange={handleTextareaChange} onFocus={onFocusClick} onBlur={onBlurClick}></textarea>
          {/* <div onClick={() => clearText()}>
            X
          </div> */}
          {/* <div onClick={() => swicthDropDown()}>
            click
          </div> */}
        </div>

        {isShowDropDown && (
          <div className="dropdown-container" >
            {measureArr.map((option, index) => (
              <div onMouseDown={(e) => e.preventDefault()} onClick={() => handleSelectChange(option.value)} key={index} className="drop-down-menu">
                {option.value}
              </div>))}
          </div>)}

      </div>
    </Fragment>
  );
}
