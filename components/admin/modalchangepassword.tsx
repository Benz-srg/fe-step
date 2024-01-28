import React from "react";
import ModalCustom from "../modal";
import { Box, Divider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import InputPassword from "../form/InputPassword";
import ButtonCustom from "../form/ButtonCustom";
import { IPayloadChangePassword } from "@/types/admin.type";
type Props = {
  open: boolean;
  handleToggleModal: () => void;
  onSubmit: (payload: IPayloadChangePassword) => void;
};

type TFormChangepassword = {
  old_password: string;
  password: string;
  confirm_password: string;
};

const ModalChangePassword: React.FC<Props> = ({
  open,
  handleToggleModal,
  onSubmit,
}) => {
  const { control, handleSubmit, watch } = useForm<TFormChangepassword>({
    defaultValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const onChangepassword = ({
    password,
    old_password,
  }: TFormChangepassword) => {
    return onSubmit({ password, old_password });
  };

  return (
    <ModalCustom open={open} onClose={handleToggleModal}>
      <Box
        textAlign="center"
        component="form"
        onSubmit={handleSubmit(onChangepassword)}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "36px",
              lineHeight: "53.82px",
            }}
          >
            เปลี่ยนรหัสผ่าน
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box textAlign="left">
            <Typography variant="body2">รหัสผ่านเดิม</Typography>
            <InputPassword
              name="old_password"
              id="old_password"
              control={control}
              rules={{
                required: "กรุณาระบุรหัสผ่านเดิม",
              }}
              placeholder="ระบุรหัสผ่านเดิม"
            />
          </Box>
          <Divider sx={{ color: "#e5e5e5" }} />
          <Box textAlign="left">
            <Typography variant="body2">รหัสผ่านใหม่</Typography>
            <InputPassword
              name="password"
              id="password"
              control={control}
              rules={{
                required: "กรุณาระบุรหัสผ่านใหม่",
              }}
              placeholder="ระบุรหัสผ่านใหม่"
            />
          </Box>
          <Box textAlign="left">
            <Typography variant="body2">ยืนยันรหัสผ่านใหม่</Typography>
            <InputPassword
              name="confirm_password"
              id="confirm_password"
              control={control}
              rules={{
                required: "กรุณาระบุยืนยันรหัสผ่านใหม่",
                validate: (val: string) => {
                  if (watch("password") != val) {
                    return "ยืนยันรหัสผ่านไม่ตรงกัน";
                  }
                },
              }}
              placeholder="ระบุยืนยันรหัสผ่านใหม่"
            />
          </Box>
          <Box>
            <ButtonCustom type="submit" title="ยืนยัน" />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography>จำรหัสผ่านไม่ได้ใช่หรือไม่?</Typography>
            <Typography
              sx={{
                color: "#6869ac",
                pl: 1,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              จำรหัสผ่านไม่ได้ใช่หรือไม่?
            </Typography>
          </Box>
        </Box>
      </Box>
    </ModalCustom>
  );
};

export default ModalChangePassword;
