import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import modalStyle from "./modalstyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function CardDept({ dept, handleDel }) {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  return (
    <Fragment>
      <div className="dept-card">
        <div className="dept-name">{dept.dept_name}</div>
        <div className="dept-action">
          <div
            className="dept-edit"
            onClick={() => router.push(`/dept/edit_dept?id=${dept.dept_id}`)}
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
          <span>คุณต้องการลบแผนก {dept.dept_name}</span>
          <div className="box-modal-button">
            <div
              onClick={() => {
                handleDel();
              }}
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
    </Fragment>
  );
}
