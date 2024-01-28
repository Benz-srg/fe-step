import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

type Props = { title: string; onClick?: (data?: any) => void };

const Cardfileupload = (props: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid #e5e5e5",
        borderRadius: 2,
        py: 0.5,
        px: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography>{props.title}</Typography>
      <IconButton size="small" onClick={props.onClick}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default Cardfileupload;
