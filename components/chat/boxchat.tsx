import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  Avatar,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import router from "next/router";
import MyChat from "@/components/chat/mychat";
import ImageIcon from "@mui/icons-material/Image";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import io from "socket.io-client";

type Props = {};

const MessageBox = (props: Props) => {
  React.useEffect(() => {
    const socket = io("http://localhost:3005"); // URL ของ WebSocket Gateway ของ Nest.js

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("joinRoom", (message) => {
      console.log("Received message:", message);
    });

    socket.on("receiveMessage", (msg) => {
      console.log(`sendMessage :`, msg);
    });

    // เมื่อ unmount หน้า
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = io("http://localhost:3005"); // URL ของ WebSocket Gateway ของ Nest.js
    socket.emit("sendMessage", {
      id: "1",
      message: "Hello from Next.js",
      type: "text",
    });
  };
  return (
    <div
      style={{
        borderRight: "1px solid #e5e5e5",
        height: "85vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          px: 2,
          borderBottom: "1px solid #e5e5e5",
          display: "flex",
          alignItems: "center",
          gap: 2,
          height: 75,
        }}
      >
        <Avatar sizes="small">
          <ImageIcon />
        </Avatar>
        <Typography>แว่นตากรองแสง UV</Typography>
      </Box>

      <Box
        sx={{
          overflowY: "auto", // ให้มีแถบเลื่อนเมื่อเกินความสูงสูงสุด
          height: "85vh",
          pb: 7,
          bgcolor: "#f7f9fa",
        }}
      >
        <Box sx={{ pl: 3, display: "flex", pt: 1, gap: 1 }}>
          <Avatar sizes="small">
            <ImageIcon />
          </Avatar>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">Admin</Typography>
              <FiberManualRecordIcon
                sx={{ fontSize: 12, mx: 0.5, color: "#D9D9D9" }}
              />
              <Typography variant="body2">12:57</Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                py: 1.5,
                border: "1px solid #E5E5E5",
                px: 2,
                mt: 1,
                borderRadius: "0px 12px 12px 12px",
              }}
            >
              <Typography variant="body2">
                ให้มีแถบเลื่อนเมื่อเกินความสูงสูงสุด
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                py: 1.5,
                border: "1px solid #E5E5E5",
                px: 2,
                mt: 1,
                borderRadius: "0px 12px 12px 12px",
              }}
            >
              <Typography variant="body2">
                ให้มีแถบเลื่อนเมื่อเกินความสูงสูงสุด
              </Typography>
            </Paper>
            <Paper
              elevation={0}
              sx={{
                py: 1.5,
                border: "1px solid #E5E5E5",
                px: 2,
                mt: 1,
                borderRadius: "0px 12px 12px 12px",
              }}
            >
              <Typography variant="body2">
                ให้มีแถบเลื่อนเมื่อเกินความสูงสูงสุด
              </Typography>
            </Paper>
            <Box>
              <Button
                sx={{
                  py: 1.5,
                  px: 2,
                  mt: 1,
                  color: "#0066FF",
                  border: "1px solid #E5E5E5",
                  backgroundColor: "#fff",
                  borderRadius: "100px",
                }}
              >
                <Typography variant="body2">เป็นผลิตภัณฑ์ใหม่</Typography>
              </Button>
            </Box>

            <Button
              sx={{
                py: 1.5,
                px: 2,
                mt: 1,
                color: "#0066FF",
                border: "1px solid #E5E5E5",
                backgroundColor: "#fff",
                borderRadius: "100px",
              }}
            >
              <Typography variant="body2">เป็นกรรมวิธีใหม่</Typography>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{ pr: 3, display: "flex", justifyContent: "end", pt: 1, gap: 1 }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <Typography variant="body2">12:57</Typography>
              <FiberManualRecordIcon
                sx={{ fontSize: 12, mx: 0.5, color: "#04aa6e" }}
              />
              <Typography variant="body2">You</Typography>
            </Box>
            <MyChat type="text" message="This is a sample text" />
            <MyChat type="file" message="This is a sample text" />
            <MyChat type="image" imageUrl="https://www.hafelethailand.com/wp-content/uploads/2022/11/eat-well-healthy-blood-type-banner.jpg" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "#fff",
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
          height: 84,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          px: 2,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              transition:
                "transform 0.2s, background-color 0.2s, border-radius 0.2s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "100%",
                cursor: "pointer",
              },
            }}
          >
            <img src="icon/emoji.svg" width={30} alt="" />
          </Box>
          <Box
            sx={{
              width: 30,
              height: 30,
              transition:
                "transform 0.2s, background-color 0.2s, border-radius 0.2s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "100%",
                cursor: "pointer",
              },
            }}
          >
            <img src="icon/file.svg" width={30} alt="" />
          </Box>
          <Box
            sx={{
              width: 30,
              height: 30,
              transition:
                "transform 0.2s, background-color 0.2s, border-radius 0.2s",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderRadius: "100%",
                cursor: "pointer",
              },
            }}
          >
            <img src="icon/image.svg" width={30} alt="" />
          </Box>
        </Box>

        <TextField
          style={{
            flexGrow: 1,
            borderRadius: "12px",
            border: "1px solid #E5E5E5",
            backgroundColor: "#F6F8FA",
            outline: "none",
          }}
          InputProps={{
            style: {
              padding: "8px 10px",
            },
            disableUnderline: true,
          }}
          variant="standard"
          placeholder="Enter text here"
        />
        <Box>
          <Button
            sx={{ borderRadius: "50%", p: 0, m: 0, minWidth: "40px" }}
            onClick={sendMessage}
          >
            <img src="icon/send.svg" width={40} alt="" />
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default MessageBox;
