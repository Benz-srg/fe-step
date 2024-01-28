import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type TypographyVariant =
  | "inherit"
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "overline"
  | "srOnly"
  | undefined;

interface ITypographyInLine {
  title: string;
  subtitle?: string;
  icon?: React.ReactElement;
  variant?: TypographyVariant;
}

const TypographyInLine: React.FC<ITypographyInLine> = ({
  subtitle,
  icon,
  title,
  variant,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {icon && <div style={{ marginRight: "5px" }}>{icon}</div>}
      <div style={{ marginRight: "5px" }}>
        <Typography variant={variant || ("subtitle1" as any)}>
          {title}
        </Typography>
      </div>
      {subtitle && (
        <Typography variant={variant || ("subtitle1" as any)} color={"#a3a3a3"}>
          ({subtitle})
        </Typography>
      )}
    </Box>
  );
};

export default TypographyInLine;
