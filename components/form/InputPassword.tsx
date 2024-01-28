import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

type TInputProps = {
  name: string;
  id?: string;
  maxLength?: number;
  placeholder?: string;
  rules?: Record<string, any>;
  control: any;
  disabled?: boolean;
};

export default function InputPassword({
  name,
  id,
  placeholder,
  maxLength = 50,
  rules = {},
  control,
  disabled = false,
}: TInputProps) {
  const [isvisibled, setIsvisibled] = React.useState<boolean>(false);
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            disabled={disabled}
            type={isvisibled ? "text" : "password"}
            {...field}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => setIsvisibled(!isvisibled)}
                >
                  <VisibilityIcon sx={{ color: "#000" }} />
                </IconButton>
              ),
              sx: { borderRadius: "10px" },
            }}
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            inputProps={{ maxLength: maxLength }}
            fullWidth
            variant="outlined"
            id={id}
            name={name}
            placeholder={placeholder}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
                backgroundColor: "#f7f7f7",
              },
            }}
          />
        );
      }}
    />
  );
}
