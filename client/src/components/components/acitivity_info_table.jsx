import { Fragment, useState } from "react";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DATA from "./data";
export default function ActInfoTable() {

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
                },
                {
                    header: 'เงื่อนไขเกี่ยวกับบุคคลที่มีสิทธิเข้าถึงข้อมูล',
                    accessorKey: 'task',
                },
                {
                    header: 'วิธัการเข้าถึงข้อมูลส่วนบุคคล',
                    accessorKey: 'task',
                },
                {
                    header: 'เงื่อนไขในการเข้าถึงข้อมูล',
                    accessorKey: 'task',
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
            cell: (() => (<Fragment><span>ลบ</span> <span>แก้ไข</span></Fragment>))
        },

    ]


    const [data, setData] = useState(DATA)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <Fragment>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerG) => (
                        <tr >
                            {headerG.headers.map((header) =>
                                <th >
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
