"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useStore } from "@nanostores/react";
import { configStore, tConfigStore } from "../../app/store/config";
import { AccountCircle, Logout } from "@mui/icons-material";
import { Box, Badge, Avatar } from "@mui/material";
import { authStore } from "@/app/store/auth";
import { useRouter } from "next/navigation";
import { $user } from "@/app/store/user";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function Header(props: Props) {
  const config: tConfigStore = useStore(configStore);
  const userItem = useStore($user);
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const signOut = () => {
    authStore.set({ isLoggedIn: false, isInitialized: false, user: null });
    router.push("/login");
  };

  return (
    <AppBar
      component="nav"
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${config.drawerWidth}px)` },
        ml: { sm: `${config.drawerWidth}px` },
        background: "#ffffff",
      }}
      elevation={1}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" color={"black"}>
          ขอคำปรึกษา
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ pr: 1 }}>
              <Avatar
                alt="Remy Sharp"
                src={
                  userItem.img_profile
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/images/${userItem.img_profile}`
                    : "https://mui.com/static/images/avatar/1.jpg"
                }
                sx={{ width: 42, height: 42 }}
              />
            </Box>
            <Box>
              <Typography sx={{ color: "black" }}>
                {userItem.full_name}
              </Typography>
              <Typography sx={{ color: "#a3a3a3", fontSize: "12px" }}>
                {userItem.email}
              </Typography>
            </Box>
          </Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            // aria-controls={menuId}
            aria-haspopup="true"
            onClick={() => signOut()}
            color="inherit"
          >
            <Logout sx={{ color: "black" }} />
          </IconButton>
        </Box>

        {/*  */}

        {/*  */}
      </Toolbar>
    </AppBar>
  );
}
