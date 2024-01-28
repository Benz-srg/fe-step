import Button from "@mui/material/Button";
import React, { ReactNode } from "react";

type Props = {
  type: "button" | "submit" | "reset";
  title: string | ReactNode;
  background?: string;
  hoverbg?: string;
  fullWidth?: boolean;
  onClick?: (payload?: any) => void;
  disabled?: boolean;
  variant?: "contained" | "outlined";
};

const ButtonCustom: React.FC<Props> = ({
  type = "button",
  title,
  background,
  hoverbg,
  onClick,
  disabled = false,
  fullWidth = false,
  variant = "contained",
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      sx={{
        pl: 5,
        pr: 5,
        borderRadius: 2,
        background: background || "#f9ad1d",
        color: "black",
        "&:hover": {
          background: hoverbg || "#e68a00",
        },
        "&:disabled": {
          background: "#f9ad1d",
          opacity: 0.7,
        },
      }}
      disableElevation
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default ButtonCustom;
