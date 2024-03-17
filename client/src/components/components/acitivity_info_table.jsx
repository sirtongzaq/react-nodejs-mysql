import { Fragment, useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Box, Modal } from "@mui/material";
import modalStyle from "./modalstyle";
import EditRowTable from "./edit_row_table";
export default function ActInfoTable({
  formData,
  currPage,
  onPageChange,
  newData,
  onNewData,
}) {
  const columns = [
    {
      header: "ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)",
      accessorKey: "p_data_name",
    },
    {
      header: "เจ้าของข้อมูลส่วนบุคคล",
      accessorKey: "p_data_subject",
    },

    {
      header: "ไดรับข้อมูลจาก",
      accessorKey: "p_data_source",
    },

    {
      header: "รูปแบบของข้อมูล",
      accessorKey: "p_data_type_detail",
    },

    {
      header: "ประเภทข้อมูลส่วนบุคคล",
      accessorKey: "p_data_type",
    },
    {
      header: "วัตถุประสงค์การเก็บรวบรวมข้อมูล",
      accessorKey: "p_data_object",
    },
    {
      header: "ฐานทางกฎหมายสำหรับประมวลผลข้อมูลส่วนบุคคล",
      accessorKey: "p_data_legal_base",
    },
    {
      header: "ระยะเวลาการจัดเก็บข้อมูลส่วนบุคคล",
      accessorKey: "p_data_time_period",
    },
    {
      header: "แหล่งจัดเก็บข้อมูลส่วนบุคคล",
      accessorKey: "p_data_storage",
    },
    {
      header: "สิทธิและวิธีการเข้าถึงข้อมูลส่วนบุคคล",
      columns: [
        {
          header: "บุคคลที่มีสิทธิเข้าถึงข้อมูล",
          accessorKey: "p_data_name_access",
          style: {
            textAlign: "center",
            whiteSpace: "unset",
          },
        },
        {
          header: "เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล",
          accessorKey: "p_data_condition_name_access",
          style: {
            textAlign: "center",
            whiteSpace: "unset",
          },
        },
        {
          header: "วิธีการเข้าถึงข้อมูลส่วนบุคคล",
          accessorKey: "p_data_how_to_access",
          style: {
            textAlign: "center",
            whiteSpace: "unset",
          },
        },
        {
          header: "เงื่อนไขในการเข้าถึงข้อมูล",
          accessorKey: "p_data_condition_to_access",
          style: {
            textAlign: "center",
            whiteSpace: "unset",
          },
        },
      ],
    },
    {
      header: "ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง",
      accessorKey: "p_data_whouse_inorg",
    },
    {
      header: "ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเผยให้ใครบ้าง",
      accessorKey: "p_data_whouse_outorg",
    },
    {
      header: "วิธีการทำลายข้อมูลส่วนบุคคล",
      accessorKey: "p_data_way_destroy",
    },
    {
      header: "ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ",
      accessorKey: "p_data_approve_destroy",
    },
    {
      header: "ลบ/แก้ไข",
      cell: ({ row }) => (
        <Fragment>
          <div className="edit-delete-row">
            <span className="edit-row-table" onClick={() => { handleClickEdit(row.index) }}>แก้ไข</span>
            <span
              className="delete-row-table"
              onClick={() => handleDeleteRow(row.index)}
            >
              ลบ
            </span>
          </div>
        </Fragment>
      ),
    },
  ];

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [editRow, setEditRow] = useState([])
  const [data, setData] = useState(newData);
  const [editIndex, setIndexEdit] = useState(0)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  const handleClickEdit = (index) => {
    const newDataArray = [...data];
    const editData = newDataArray[index]
    setEditRow([editData])
    setIndexEdit(index)
    setOpenModalCreate((prev) => !prev)
  }

  const onChangeDataTable = (value) => {
    if (value) {
      const newData = [...data]
      newData[editIndex] = value
      setData(newData);
      setOpenModalCreate((prev) => !prev)
    } else {
      console.log("noDataTable")
    }
  };


  const handleDeleteRow = (index) => {
    const newDataArray = [...data];
    newDataArray.splice(index, 1);
    setData(newDataArray);
  };





  useEffect(() => {
    setData(newData);
  }, [newData]);

  useEffect(() => {
    onNewData(data);
  }, [data]);


  return (
    <Fragment>
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
                  {flexRender(cells.column.columnDef.cell, cells.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal open={openModalCreate}>
        <Box sx={modalStyle.boxStyle}>
          <button
            onClick={() => {
              setOpenModalCreate(!openModalCreate);
            }}
            className="close-button-new-role"
          >
            X
          </button>
          <EditRowTable editTableData={editRow} onChangeDataTable={onChangeDataTable}>

          </EditRowTable>
        </Box>
      </Modal>
    </Fragment>
  );
}
