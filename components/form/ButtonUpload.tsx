import * as React from "react";
import { styled } from "@mui/material/styles";

import Button from "@mui/material/Button";
import { Box, SvgIcon, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

type TUploadProps = {
  multiple?: boolean;
  onChange?: (files: any) => void;
  name: string;
  control?: any;
  rules?: Record<string, any>;
  accept?: string;
};

export default function ButtonUpload({
  multiple = false,
  // onChange,
  name,
  control,
  rules = {},
  accept = "image/png, image/jpeg , .pdf, .doc , .ppt",
}: TUploadProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box>
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="outlined"
              sx={{ borderRadius: 2 }}
              startIcon={
                <SvgIcon>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                </SvgIcon>
              }
            >
              อัพโหลดเอกสาร
              <VisuallyHiddenInput
                type="file"
                multiple={multiple}
                onChange={(e) => field.onChange(e.target.files)}
                accept={accept}
              />
            </Button>
            {error?.message && (
              <Typography sx={{ pl: 1 }} color="red" variant="body2">
                {error?.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
}
