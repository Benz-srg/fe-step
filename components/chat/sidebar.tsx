import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Avatar,
  Badge,
  InputAdornment,
  ListItemAvatar,
  Stack,
  TextField,
} from "@mui/material";
import router from "next/router";
import ImageIcon from "@mui/icons-material/Image";
import SearchIcon from "@mui/icons-material/Search";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div
      style={{
        borderRight: "1px solid #e5e5e5",
        height: "85vh",
      }}
    >
      <Box
        sx={{
          py: 2,
          px: 2,
          borderBottom: "1px solid #e5e5e5",
          height: 75,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          บทสนทนา
        </Typography>
      </Box>
      <Box sx={{ py: 1, px: 2 }}>
        <Box
          sx={{
            p: 1,
            border: "1px solid #dfdfdf",
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          เริ่มบทสนทนาใหม่
        </Box>
      </Box>
      <Box sx={{ py: 1, px: 2 }}>
        <TextField
          sx={{
            flexGrow: 1,
            borderRadius: 2,
            border: "1px solid #6869AC",
            outline: "none",
            "& .MuiInputBase-input::placeholder": {
              color: "#6869AC !important",
              opacity: 1,
            },
          }}
          fullWidth
          InputProps={{
            style: {
              padding: "4px 10px",
            },
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#6869AC" }} />
              </InputAdornment>
            ),
          }}
          variant="standard"
          placeholder="ค้นหาชื่อผู้ประดิษฐ์ / ชื่อสิ่งประดิษฐ์"
        />
      </Box>
      <Box>
        <List
          sx={{
            overflowY: "auto", // ให้มีแถบเลื่อนเมื่อเกินความสูงสูงสุด
            height: "85vh",
            pb: 7,
          }}
        >
          {[
            { id: 1, url: "/project", title: "รายการคำร้อง" },
            { id: 2, url: "/project3", title: "รายการคำร้องa" },
            { id: 3, url: "/project32", title: "รายการคำร้องa" },
            { id: 4, url: "/project33", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
            { id: 5, url: "/project34", title: "รายการคำร้องa" },
          ].map((text, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                borderBottom: "1px solid #eeeeee",
                ":first-child": { borderTop: "1px solid #eeeeee" },
              }}
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <Box sx={{ width: "100%", py: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ textAlign: "left" }}>
                      หลังคากรองแสงบ้านเย็น
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "right", color: "#a3a3a3" }}
                    >
                      15.00
                    </Typography>
                  </Box>
                  <Box
                    component="div"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#a3a3a3",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        width: 150,
                      }}
                    >
                      🔥 แบบฟอร์มกรอกข้อมูลผล...
                    </Typography>
                    <Box sx={{ pr: 1.5 }}>
                      <Badge
                        badgeContent={4}
                        color="error"
                        overlap="circular"
                      ></Badge>
                    </Box>
                  </Box>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;
