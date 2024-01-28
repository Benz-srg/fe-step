import {
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";
import Header from "./header";
import SideBar from "./sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <div style={{ width: 220 }}>
        <SideBar />
      </div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: 3,
          width: { sm: `calc(100% - ${240}px)` },
          minHeight: "100vh",
          background: "#f7f7f7",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
