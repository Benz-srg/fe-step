import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  id?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  control: any;
  multiple?: boolean;
};

export default function InputArea({
  name,
  id,
  placeholder,
  rules = {},
  control,
}: TInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <TextField
            {...field}
            helperText={error ? error.message : null}
            size="small"
            error={!!error}
            fullWidth
            variant="outlined"
            id={id}
            name={name}
            placeholder={placeholder}
            multiline
            maxRows={10}
            minRows={5}
          />
        );
      }}
    />
  );
}
