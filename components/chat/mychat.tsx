import React, { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ModalCustom from "@/components/modal";

interface MyChatProps {
  type: "text" | "image" | "file";
  message?: string;
  imageUrl?: string;
  fileUrl?: string;
}

const MyChat: FC<MyChatProps> = ({ type, message, imageUrl, fileUrl }) => {
  const [showImagePreview, setShowImagePreview] = useState(false);

  const toggleImagePreview = () => {
    if (type == "image") setShowImagePreview(!showImagePreview);
  };
  const showMsg = () => {
    let msg;
    switch (type) {
      case "text":
        msg = <Typography variant="body2">{message}</Typography>;
        break;
      case "image":
        msg = (
          <div>
            <img
              src={imageUrl || ""}
              style={{
                maxWidth: "250px",
              }}
              alt=""
            />
          </div>
        );
        break;
      case "file":
        msg = <Typography sx={{color:'#0066FF'}} variant="body2"><a>📋 {message}</a></Typography>;
        break;
      default:
        break;
    }
    return msg;
  };
  return (
    <>
      <ModalCustom open={showImagePreview} onClose={toggleImagePreview}>
        {type === "image" ? (
          <div>
            <img
              src={imageUrl || ""}
              style={{
                maxWidth: "480px",
              }}
              alt=""
            />
          </div>
        ) : null}
      </ModalCustom>
      <Paper
        elevation={0}
        sx={{
          py: 1.5,
          px: 2,
          mt: 1,
          bgcolor: "#4aa4f7",
          color: "#fff",
          borderRadius: "12px 0px 12px 12px",
          overflowY: "auto",
          maxHeight: "200px",
          cursor: "pointer",
        }}
        onClick={() => toggleImagePreview()}
      >
        {showMsg()}
      </Paper>
    </>
  );
};

export default MyChat;
