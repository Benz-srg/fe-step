"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { useStore } from "@nanostores/react";
import { configStore, tConfigStore } from "../../app/store/config";
import { Badge, IconButton, Typography } from "@mui/material";
import { $user } from "@/app/store/user";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SideBar(props: Props) {
  const pathName = usePathname();
  const config: tConfigStore = useStore(configStore);
  const userItem = useStore($user);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ padding: 10 }}>
      <Toolbar />
      {/* <Divider /> */}
      <Typography sx={{ color: "black", pl: 1 }}>Menu</Typography>
      <List>
        {[{ id: 1, url: "/project", title: "รายการคำร้อง" }].map(
          (text, index) => (
            <ListItem
              key={text.url}
              disablePadding
              secondaryAction={
                <Badge
                  color="error"
                  overlap="circular"
                  badgeContent="50"
                  sx={{ pl: 5 }}
                ></Badge>
              }
              sx={{
                bgcolor: pathName.startsWith(text.url) ? "#f7f7f7" : "inherit",
                borderRadius: 2,
              }}
              onClick={() => router.push(text.url)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.title} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      {userItem.user_type_id === 3 ? (
        <List>
          {[
            { id: 3, url: "/user", title: "จัดการผู้ใช้" },
            { id: 4, url: "/admin", title: "จัดการ Admin" },
          ].map((text: any, index) => (
            <ListItem
              key={text.title}
              disablePadding
              sx={{
                bgcolor: pathName.startsWith(text.url) ? "#f7f7f7" : "inherit",
                borderRadius: 2,
              }}
              onClick={() => router.push(text.url)}
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : null}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: config.drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: config.drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: config.drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
