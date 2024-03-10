import { Fragment, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

export default function SearchDept({ onChangeDeptList }) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState([]);  
  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const onDeleteSearch = () => {
    setSearch("");
    getDept("");
  };

  const getDept = (value) => {
    // console.log(value);
    // setDept([])
    onChangeDeptList(search);
  };

  useEffect(() => {
    if (search.trim() != "") {
      getDept(search);
    } else {
      setSearch("");
      getDept("");
    }
  }, [search]);

  useEffect(() => {
    onChangeDeptList(dept);
  }, [dept]);

  return (
    <Fragment>
      <div className="dept-search">
        <div className="dept-search-container">
          <span>
            <FontAwesomeIcon icon={SolidIcon.faMagnifyingGlass} />
          </span>
          <input
            type="text"
            placeholder="Search"
            onChange={onSearch}
            value={search}
          />
          <span onClick={onDeleteSearch}>
            <FontAwesomeIcon icon={SolidIcon.faXmark} />
          </span>
        </div>
      </div>
    </Fragment>
  );
}
