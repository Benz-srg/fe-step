"use client";

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";

import { Kanit } from "next/font/google";

const Propmt = Kanit({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: Propmt.style.fontFamily,
    fontSize: 12,
  },
  palette: {
    background: {
      default: "white",
    },
  },
  components: {},
};
const theme = createTheme(themeOptions);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
