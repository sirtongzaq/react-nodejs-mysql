import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useEffect, useState } from "react";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import dataInActService from "@/services/datainactservice";

const mock = [
  {
    id: 1,
    p_data_name: "NoData",
    p_data_storage: "NoData",
    p_data_name_access: "NoData",
    p_data_approve_destroy: "NoData",
    p_data_way_destroy: "NoData",
    act_name: "NoData",
    dept_name: "NoData",
  },
];

export default function PersonalTable({}) {
  const columns = [
    {
      header: "ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)",
      accessorKey: "p_data_name",
    },
    {
      header: "แหล่งจัดเก็บข้อมูลส่วนบุคคล",
      accessorKey: "p_data_storage",
    },
    {
      header: "บุคคลที่มีสิทธิเข้าถึงข้อมูล",
      accessorKey: "p_data_name_access",
    },
    {
      header: "ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ",
      accessorKey: "p_data_approve_destroy",
    },
    {
      header: "วิธีการทำลายข้อมูลส่วนบุคคล",
      accessorKey: "p_data_way_destroy",
    },
    {
      header: "กิจกรรมที่ทำการบันทึก",
      accessorKey: "act_name",
    },
    {
      header: "แผนกที่ทำการบันทึก",
      accessorKey: "dept_name",
    },
  ];

  const [data, setData] = useState([]);
  const [filterTable, setFilterTable] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filterTable,
    },
    onGlobalFilterChange: setFilterTable,
  });

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setFilterTable(searchValue);
  // };

  const searchPersonalData = async () => {
    try {
      const res = await dataInActService.searchPersonal(searchValue);
      if (res) {
        const dataArr = [];
        for (let item of res) {
          const newObj = {
            id: item.data_id,
            p_data_name: item.p_data_name,
            p_data_storage: item.p_data_storage,
            p_data_name_access: item.p_data_name_access,
            p_data_approve_destroy: item.p_data_approve_destroy,
            p_data_way_destroy: item.p_data_way_destroy,
            act_name: item.act_name,
            dept_name: item.dept_name,
          };
          dataArr.push(newObj);
        }
        setData(dataArr);
      }
    } catch (e) {
      console.log("error", e);
      setData([]);
    }
  };

  // const getPersonalData = async () => {
  //   try {
  //     const res = await dataInActService.getPersonal();
  //     if (res) {
  //       const dataArr = [];
  //       for (let item of res) {
  //         const newObj = {
  //           id: item.data_id,
  //           p_data_name: item.p_data_name,
  //           p_data_storage: item.p_data_storage,
  //           p_data_name_access: item.p_data_name_access,
  //           p_data_approve_destroy: item.p_data_approve_destroy,
  //           p_data_way_destroy: item.p_data_way_destroy,
  //           act_name: item.act_name,
  //           dept_name: item.dept_name,
  //         };
  //         dataArr.push(newObj);
  //       }
  //       setData(dataArr);
  //     }
  //   } catch (e) {
  //     console.log("error", e);
  //     setData([]);
  //   }
  // };

  const onDeleteSearch = () => {
    setFilterTable("");
    setSearchValue("");
  };

  useEffect(() => {
    searchPersonalData();
  }, [searchValue]);

  // useEffect(() => {
  //   setFilterTable(searchValue);
  // }, [searchValue]);

  // useEffect(() => {
  //   getPersonalData();
  // }, []);
  return (
    <Fragment>
      <div className="dept-search">
        <div className="dept-search-container">
          <span>
            <FontAwesomeIcon icon={SolidIcon.faMagnifyingGlass} />
          </span>
          {/* <form onSubmit={handleSubmit}> */}
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          {/* <button type="submit">
                            <FontAwesomeIcon icon={SolidIcon.faSearch} />
                        </button> */}
          {/* </form> */}
          <span onClick={onDeleteSearch}>
            <FontAwesomeIcon icon={SolidIcon.faTimes} />
          </span>
        </div>
      </div>

      <div style={{ marginTop: "20px" }} className="actTable">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerG) => (
              <tr key={headerG.id}>
                {headerG.headers.map((header) => (
                  <th colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cells) => (
                  <td key={cells.id}>
                    {flexRender(
                      cells.column.columnDef.cell,
                      cells.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}
