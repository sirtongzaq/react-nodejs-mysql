import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
import { Box, Modal } from "@mui/material";
import modalStyle from "./modalstyle";
export default function CardActiDept({
    act,
    onDelete,
}) {
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);


    const handleDeleteAct = (id) => {
        onDelete(id)
        setOpenModal(false)
    }

    useEffect(() => {
        // console.log("act", act)
    }, [act])
    return (
        <Fragment>
            {/* onClick={() => router.push(`/dept/activity_dept?id=${""}`) */}
            <div className="dept-card">
                <div className="dept-name" onClick={() => router.push(`/dept/edit_activity?id=${act.act_id}`)}>กิจกรรม {act.act_name}</div>
                <div className="dept-action">
                    <div
                        className="dept-edit"
                        onClick={() => router.push(`/dept/edit_activity?id=${act.act_id}`)}
                    >
                        <FontAwesomeIcon icon={SolidIcon.faPen} />
                    </div>
                    <div
                        onClick={() => {
                            setOpenModal(true);
                        }}
                        className="dept-delete"
                    >
                        <FontAwesomeIcon icon={SolidIcon.faTrash} />
                    </div>
                </div>
            </div>
            <Modal open={openModal}>
                <Box sx={modalStyle.boxStyle}>
                    <span>คุณต้องการลบกิจกรรม {act.act_name} </span>
                    <div className="box-modal-button">
                        <div
                            onClick={() => { handleDeleteAct(act.act_id)}}
                            className="box-modal-delete-button"
                        >
                            ลบ
                        </div>
                        <div
                            onClick={() => {
                                setOpenModal(false);
                            }}
                            className="box-modal-cancel-button"
                        >
                            ยกเลิก
                        </div>
                    </div>
                </Box>
            </Modal>
        </Fragment>)
}