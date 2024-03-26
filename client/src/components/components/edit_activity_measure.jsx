import MeasuresService from "@/services/measuresservice";
import { Fragment, use, useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import toastNoti from "./toast";

export default function EditActMeasure({
  measure,
  handleValue,
  field,
  data,
  userRole,
}) {
  const [newValueOption, setNewValueOption] = useState("");
  const [selectValue, setSelectValue] = useState({});
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

  // const handleCreate = () => {
  //   setSelectValue({ value: newValueOption, label: newValueOption });
  //   handleValue(newValueOption, field);
  // };

  // const swicthDropDown = () => {
  //   setIsShowDropDown((prev) => !prev)
  // }

  const onBlurClick = () => {
    setIsShowDropDown(false)
  }

  const onFocusClick = () => {
    setIsShowDropDown(true)
  }


  const handleTextareaChange = (event) => {
    const { value } = event.target;
    setSelectValue({ value: value, label: value });
    if (value.trim() !== "") {
      handleValue(value, field);
    } else {
      toastNoti.toasterror("ท่านไม่ได้ระบุข้อมูลระบบจะใส่ข้อมูลก่อนหน้าเมื่อท่านกดบันทึก")
    }
  };
  // const handleOptionClick = (value) => {
  //   setNewValueOption(value);
  //   // handleValue(value, field);
  //   console.log(value)
  // };


  // const clearText = () => {
  //   setSelectValue({ value: "", label: "" });
  //   handleValue("", field);
  // };

  useEffect(() => {
    setSelectValue({ value: data, label: data });
  }, [data]);

  useEffect(() => {
    console.log(measure)
    setMeasureArr(measure);
  }, [measure]);

  // useEffect(() => {
  //   console.log("setNewValueOption", newValueOption)
  // }, [newValueOption])

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
          isDisabled={userRole === "User" ? true : false}
        />
      </div> */}
      <div>
        <div className="text-area-dropdown-btn">
          <textarea name="" id="" cols="30" rows="10"
            value={selectValue.value}
            onClick={onFocusClick}
            onChange={handleTextareaChange}
            onFocus={onFocusClick}
            onBlur={onBlurClick}
            disabled={userRole == "User"}
          />
          {/* <div onClick={() => clearText()}>
            X
          </div> */}
          {/* <div onClick={() => swicthDropDown()}>
            click
          </div> */}
        </div>

        {(isShowDropDown && userRole != "User") && (
          <div className="dropdown-container" >
            <div className="menu-container">
              {measureArr.map((option, index) => (
                <div onMouseDown={(e) => e.preventDefault()} onClick={() => handleSelectChange(option.value)} key={index} className="drop-down-menu">
                  {option.value}
                </div>))}
            </div>
          </div>)}

      </div>
    </Fragment>
  );
}
