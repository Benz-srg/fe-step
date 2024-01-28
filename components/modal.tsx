import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "12px",
  p: 4,
};

const closeButtonStyle = {
  position: "absolute",
  top: "8px",
  right: "8px",
  cursor: "pointer",
};

type Props = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  width?: string;
  disabledOutside?: boolean;
};

const ModalCustom = ({
  children,
  open,
  onClose,
  width = "543px",
  disabledOutside,
}: Props) => {
  return (
    <>
      <Modal
        open={open}
        onClose={(e) => !disabledOutside && onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
        disableEnforceFocus
      >
        <Box sx={{ ...style, width: width }}>
          <IconButton onClick={onClose} sx={closeButtonStyle}>
            <CloseIcon />
          </IconButton>
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default ModalCustom;
