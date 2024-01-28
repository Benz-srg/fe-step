"use client";
import React, { useEffect } from "react";
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
import { useSearchParams } from "next/navigation";

type FormProps = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const params = useSearchParams();

  const [kid, setKid] = React.useState<string>("");
  const firstRender = React.useRef<boolean>(false);
  const router = useRouter();
  const methods = useForm<FormProps>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = methods;
  React.useEffect(() => {
    if (firstRender.current) return;
    firstRender.current = true;
    const p_kid = params.get("kid");
    setKid(p_kid as string);
    if (!p_kid) router.push("/");
  }, []);

  const handleFormChange = () => {
    // เมื่อมีการเปลี่ยนแปลงใน input password หรือ confirmPassword
    // เราต้องล้าง error ออกเมื่อผู้ใช้งานเริ่มพิมพ์อีกรอบ
    clearErrors(["password", "confirmPassword"]);
  };

  const onSubmit = async (data: FormProps) => {
    if (data.password !== data.confirmPassword) {
      // ถ้ารหัสผ่านไม่ตรงกัน
      setError("confirmPassword", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
    } else {
      try {
        const paylaod = {
          kid: kid,
          password: data.password,
        };
        await authService.changepassword(paylaod);
        msgSuccess("แก้ไขรหัสผ่านเรียบร้อย");
        setTimeout(() => {
          router.push("/");
        }, 700);
      } catch (error) {
        msgError("ขัดข้องในระบบ");
      }
    }
  };

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
              เปลี่ยนรหัสผ่าน
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
                      icon={<img src="icon/key.svg" width={20} alt="" />}
                      title="รหัสผ่านใหม่"
                    />
                    <Input
                      name="password"
                      id="password"
                      control={control}
                      type="password"
                      rules={{
                        required: "กรุณาระบุรหัสผ่านใหม่",
                      }}
                      placeholder="ระบุรหัสผ่านใหม่"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <TypographyInLine
                      icon={<img src="icon/key.svg" width={20} alt="" />}
                      title="ยืนยันรหัสผ่านใหม่"
                    />
                    <Input
                      name="confirmPassword"
                      id="confirmPassword"
                      control={control}
                      type="password"
                      rules={{
                        required: "กรุณาระบุยืนยันรหัสผ่านใหม่",
                      }}
                      placeholder="ระบุรหัสผ่านใหม่อีกครั้ง"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center", my: 1 }}>
                  <Box sx={{ mb: 1 }}>
                    <ButtonCustom type="submit" title="ยืนยัน" />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default ChangePassword;
