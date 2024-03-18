import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { Fragment, useEffect, useState } from "react";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

const mock = [
    {
        "id": 1,
        "first_name": "Isador",
        "last_name": "Kruger",
        "email": "ikruger0@huffingtonpost.com",
        "gender": "Male",
        "dob": "2023-04-28T11:19:35Z"
    },
    {
        "id": 2,
        "first_name": "Brady",
        "last_name": "Gommery",
        "email": "bgommery1@amazon.de",
        "gender": "Male",
        "dob": "2022-12-11T17:35:54Z"
    },
    {
        "id": 3,
        "first_name": "Boycie",
        "last_name": "Drei",
        "email": "bdrei2@uol.com.br",
        "gender": "Male",
        "dob": "2021-04-25T04:40:04Z"
    },
]

export default function PersonalTable({ }) {

    const columns = [
        {
            header: "ข้อมูลส่วนบุคคล ที่มีการเก็บรวม (ข้อมูลที่ประมวลผล)",
            accessorKey: "first_name",
            // accessorKey: "p_data_name",
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
            // accessorKey: "p_data_way_destroy",
        },
        {
            header: "แผนกที่ทำการบันทึก",
            // accessorKey: "p_data_way_destroy",
        },
    ];

    const [data, setData] = useState(mock);
    const [filterTable, setFilterTable] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filterTable
        },
        onGlobalFilterChange: setFilterTable
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setFilterTable(searchValue);
    // };

    const onDeleteSearch = () => {
        setFilterTable("");
        setSearchValue("");
    };

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
                        onChange={(e) => setFilterTable(e.target.value)}
                        value={filterTable}
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

            <div style={{marginTop:"20px"}}>
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
            </div>
        </Fragment>
    );
}
