import { Fragment, useEffect, useMemo, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DATA from "./data";
export default function ActInfoTable({ formData, currPage, onPageChange }) {

    const columns = [

        {
            header: 'ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)',
            accessorKey: 'task',
        },
        {
            header: 'เจ้าของข้อมูลส่วนบุคคล',
            accessorKey: 'task',
        },

        {
            header: 'ไดรับข้อมูลจาก',
            accessorKey: 'task',
        },

        {
            header: 'ประเภทข้อมูลส่วนบุคคล',
            accessorKey: 'task',
        },
        {
            header: 'วัตถุประสงค์การเก็บรวบรวมข้อมูล',
            accessorKey: 'task',
        },
        {
            header: 'ฐานทางกฎหมายสำหรับประมวลผลข้อมูลส่วนบุคคล',
            accessorKey: 'task',
        },
        {
            header: 'ระยะเวลาการจัดเก็บข้อมูลส่วนบุคคล',
            accessorKey: 'task',
        },
        {
            header: 'แหล่งจัดเก็บข้อมูลส่วนบุคคล',
            accessorKey: 'task',
        },
        {
            header: 'สิทธิและวิธีการเข้าถึงข้อมูลส่วนบุคคล',
            columns: [
                {
                    header: 'บุคคลที่มีสิทธิเข้าถึงข้อมูล',
                    accessorKey: 'task',
                    style: {
                        textAlign: "center",
                        whiteSpace: "unset",
                    },
                },
                {
                    header: 'เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล',
                    accessorKey: 'task',
                    style: {
                        textAlign: "center",
                        whiteSpace: "unset",
                    },
                },
                {
                    header: 'วิธัการเข้าถึงข้อมูลส่วนบุคคล',
                    accessorKey: 'task',
                    style: {
                        textAlign: "center",
                        whiteSpace: "unset",
                    },
                },
                {
                    header: 'เงื่อนไขในการเข้าถึงข้อมูล',
                    accessorKey: 'task',
                    style: {
                        textAlign: "center",
                        whiteSpace: "unset",
                    },
                },
            ]
        },
        {
            header: 'ข้อมูลส่วนบุคคลถูกใช้โดยตำแหน่งใดบ้าง',
            accessorKey: 'task',
        },
        {
            header: 'ข้อมูลส่วนบุคคลถูกส่งต่อ/เปิดเผยให้ใครบ้าง',
            accessorKey: 'task',
        },
        {
            header: 'วิธีการทำลายข้อมูลส่วนบุคคล',
            accessorKey: 'task',
        },
        {
            header: 'ผู้อนุมัติการทำลายข้อมูลส่วนบุคคบ',
            accessorKey: 'task',
        },
        {
            header: 'ลบ/แก้ไข',
            cell: (() => (
                <Fragment>
                    <div className="edit-delete-row">
                        <span className="edit-row-table">แก้ไข</span>
                        <span className="delete-row-table">ลบ</span> 
                    </div>
                </Fragment>))
        },

    ]


    const data = useMemo(() => DATA, [])
    const [form, setForm] = useState(null)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    // const handlePageChange =()=>{
    //     onPageChange(form)
    // }

    // useEffect(()=>{
    //    if(currPage == 2){
    //     handlePageChange()
    //    }
    // },[currPage])

    useEffect(() => {
        console.log("form", form)
    }, [form])

    useEffect(() => {
        setForm(formData)
        console.log("formDataTable", formData)
    }, [formData])

    return (
        <Fragment>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerG) => (
                        <tr key={headerG.id} >
                            {headerG.headers.map((header) =>
                                <th colSpan={header.colSpan} >
                                    {header.isPlaceholder ? null : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </th>)}
                        </tr>))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr>
                            {row.getVisibleCells().map((cells) => (
                                <td >
                                    {flexRender(cells.column.columnDef.cell,
                                        cells.getContext())}
                                </td>))}
                        </tr>
                    ))}
                </tbody>

            </table>
        </Fragment>
    )
}
