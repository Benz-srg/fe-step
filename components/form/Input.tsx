import * as React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  id?: string;
  maxLength?: number;
  placeholder?: string;
  rules?: Record<string, any>;
  control: any;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  disabled?: boolean;
  type?: "text" | "password";
};

export default function Input({
  name,
  id,
  placeholder,
  maxLength = 50,
  rules = {},
  control,
  startAdornment,
  endAdornment,
  disabled = false,
  type = "text",
}: TInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            disabled={disabled}
            type={type}
            {...field}
            InputProps={{
              startAdornment: startAdornment && startAdornment,
              endAdornment: endAdornment && endAdornment,
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
