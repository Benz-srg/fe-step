import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useFormContext, Controller } from "react-hook-form";

interface option {
  key: number | string;
  value: number | string;
}

interface SelectProps {
  options: option[];
  name: string;
  id?: string;
  placeholder?: string;
  rules?: Record<string, any>;
  control: any;
}

export default function SelectCustom({
  options,
  name,
  id,
  control,
  rules,
  placeholder,
}: SelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <Select
            {...field}
            size="small"
            sx={{ borderRadius: 2 }}
            fullWidth
            error={!!error}
            onChange={(event) => field.onChange(event)}
            displayEmpty
            renderValue={
              field.value !== "" ? undefined : () => <div>{placeholder}</div>
            }
          >
            {options.map((options) => (
              <MenuItem
                key={`${options.key}-${options.value}`}
                value={options.key}
              >
                {options.value}
              </MenuItem>
            ))}
          </Select>
        );
      }}
    />
  );
}
