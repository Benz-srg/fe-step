"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { msgSuccess, msgError } from "@/app/utils/swal";
import { Container, Typography, Card, Box, Grid } from "@mui/material";
import userService from "@/services/user.service";
import Input from "@/components/form/Input";
import ButtonCustom from "@/components/form/ButtonCustom";
import TypographyInLine from "@/components/form/TypographyInLine";
import { useRouter } from "next/navigation";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Link from "next/link";
import authService from "@/services/auth.service";

type FormProps = {
  email: string;
};

const ForgetPassword = () => {
  const [isRequired, setRequired] = React.useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<FormProps>({
    defaultValues: {
      email: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const handleFormChange = () => {};

  const onSubmit = async (data: FormProps) => {
    try {
      await authService.forget(data);
      msgSuccess("ระบบทำการส่ง verify เปลี่ยนรหัสผ่านไปยังอีเมลของท่าน");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      msgError("ขัดข้องในระบบ");
    }
  };
  // const handleOnSubmit = (data: any) => handleNextState(data, 2);
  return (
    <div>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card sx={{ maxWidth: 400, borderRadius: 3, p: 3 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center", mb: 3 }}
            >
              ลืมรหัสผ่าน
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              ระบุอีเมลที่ท่านเคยลงทะเบียนไว้
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center", mb: 4 }}>
              ระบบจะทำการส่งลิงก์ไปยังอีเมลตามที่ท่านระบุ
            </Typography>

            <Box
              component="form"
              onChange={handleFormChange}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <TypographyInLine
                      icon={<MailOutlineIcon />}
                      title="อีเมล"
                    />
                    <Input
                      name="email"
                      id="email"
                      control={control}
                      rules={{
                        required: "กรุณาระบุอีเมล",
                      }}
                      placeholder="ระบุอีเมล"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center", my: 3 }}>
                  <Box sx={{ mb: 1 }}>
                    <ButtonCustom type="submit" title="ยืนยันอีเมล" />
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center", mb: 1 }}>
                  <Link href="/">
                    <Typography variant="body2">เข้าสู่ระบบ</Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default ForgetPassword;
