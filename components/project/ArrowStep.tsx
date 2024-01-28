import { Box } from "@mui/material";
import React from "react";

type Props = { step: number; active: boolean };

const ArrowStep = ({ step, active }: Props) => {
  return (
    <Box
      sx={{
        width: "40px",
        height: "30px",
        background: active ? "#b384f0" : "#e5e5e5",
        position: "relative",
        color: "white",
        lineHeight: "30px",
        textAlign: "center",
        "::before": {},
        "::after": {
          content: '""',
          position: "absolute",
          left: "40px",
          bottom: 0,
          width: 0,
          height: 0,
          borderTop: "15px solid transparent",
          borderBottom: "15px solid transparent",
          borderLeft: `15px solid ${active ? "#b384f0" : "#e5e5e5"}`,
        },
      }}
    >
      {step}
    </Box>
  );
};

export default ArrowStep;
