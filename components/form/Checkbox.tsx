import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  label: string;
  name: string;
  sx?: Record<string, any>;
  disabled?: boolean;
};

const CheckboxHook = ({
  control,
  name,
  label,
  sx = {},
  disabled = false,
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormControlLabel
          control={
            <Checkbox
              disabled={disabled}
              name={name}
              checked={value}
              onChange={onChange}
              sx={sx}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default CheckboxHook;
