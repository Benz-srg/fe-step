import { Box, Paper } from "@mui/material";
import React from "react";
import SidebarChat from "./sidebar";
import MessageBox from "./boxchat";

type Props = {};

function ChatBox({}: Props) {
  return (
    <>
      <Paper
        sx={{
          background: "#fff",
          borderRadius: 1.5,
          overflow: "hidden",
          minHeight: "85vh",
        }}
        elevation={1}
      >
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: 400 }}>
            <SidebarChat />
          </Box>
          <Box sx={{ width: "100%" }}>
            <MessageBox />
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default ChatBox;
