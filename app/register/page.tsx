"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { IRegister } from "@/types/register.type";
import { msgSuccess, msgError } from "@/app/utils/swal";
import formatUtils from "@/app/utils/format";
import { Container, Typography, Card, Box, Grid } from "@mui/material";
import userService from "@/services/user.service";
import Input from "@/components/form/Input";
import ButtonCustom from "@/components/form/ButtonCustom";
import TypographyInLine from "@/components/form/TypographyInLine";
import { useRouter } from "next/navigation";

const Register = () => {
  const [isRequired, setRequired] = React.useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<IRegister>({
    defaultValues: {
      full_name: "",
      faculty: "",
      department: "",
      phone: "",
      email: "",
      password: "",
      assistant: {
        full_name: "",
        phone: "",
        email: "",
      },
    },
  });
  const {
    control,
    clearErrors,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const handleFormChange = () => {
    const { phone, assistant } = methods.getValues();
    if (phone) methods.setValue("phone", formatUtils.numberFormat(phone));
    if (assistant?.phone)
      methods.setValue(
        "assistant.phone",
        formatUtils.numberFormat(assistant?.phone)
      );
  };
  const assistantPhone = watch("assistant.phone", "");
  const assistantFullName = watch("assistant.full_name", "");
  const assistantEmail = watch("assistant.email", "");
  React.useEffect(() => {
    if (assistantPhone || assistantFullName || assistantEmail)
      setRequired(true);
    else {
      setRequired(false);
      clearErrors([
        "assistant.phone",
        "assistant.email",
        "assistant.full_name",
      ]);
    }
  }, [assistantPhone, assistantFullName, assistantEmail]);
  const handleOnSubmit = async (data: IRegister) => {
    try {
      await userService.create(data);
      msgSuccess("สมัครสมาชิกสำเร็จ");
      router.push("/");
    } catch (error) {
      msgError("ขัดข้องในระบบ");
    }
    //eslint-disable-next-line
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
          <Card sx={{ maxWidth: 600, borderRadius: 3, p: 3 }}>
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center", mb: 4 }}
            >
              ลงทะเบียน
            </Typography>
            <Box
              component="form"
              onChange={handleFormChange}
              onSubmit={handleSubmit(handleOnSubmit)}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <TypographyInLine
                      subtitle="ชื่อบัญชี"
                      title="ชื่ออาจารย์/นักวิจัย"
                    />
                    <Input
                      name="full_name"
                      id="full_name"
                      control={control}
                      rules={{
                        required: "กรุณาระบุชื่อหัวหน้าโครงการ",
                      }}
                      placeholder="ระบุชื่อหัวหน้าโครงการ"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">รหัสผ่าน</Typography>
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      control={control}
                      rules={{
                        required: "กรุณาระบุรหัสผ่าน",
                      }}
                      placeholder="ระบุรหัสผ่าน"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">สังกัด/คณะ</Typography>
                    <Input
                      control={control}
                      name="department"
                      id="department"
                      rules={{
                        required: "กรุณาระบุชื่อสังกัดภาควิชา/คณะ",
                      }}
                      placeholder="ระบุสังกัด/คณะ"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">
                      มหาวิทยาลับ/หน่วยงาน
                    </Typography>
                    <Input
                      control={control}
                      name="faculty"
                      id="faculty"
                      rules={{
                        required: "กรุณาระบุชื่อมหาวิทยาลับ/หน่วยงาน",
                      }}
                      placeholder="ระบุมหาวิทยาลับ/หน่วยงาน"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">เบอร์โทรติดต่อ</Typography>
                    <Input
                      control={control}
                      name="phone"
                      id="phone"
                      maxLength={10}
                      rules={{
                        required: "กรุณาระบุชื่อเบอร์โทรติดต่อ",
                        validate: {
                          matchPattern: (v: string) =>
                            /^0\d{9}$/.test(v) || "รูปแบบเบอร์โทรไม่ถูกต้อง",
                        },
                      }}
                      placeholder="ระบุเบอร์โทรติดต่อ"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2">อีเมลติดต่อ</Typography>
                    <Input
                      control={control}
                      name="email"
                      id="email"
                      rules={{
                        required: "กรุณาระบุอีเมล",
                        validate: {
                          maxLength: (v: string) =>
                            v.length <= 50 || "อีเมลต้องน้อยกว่า 50 ตัวอักษร",
                          matchPattern: (v: string) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "รูปแบบอีเมลไม่ถูกต้อง",
                        },
                      }}
                      placeholder="ระบุอีเมล"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="h6">ข้อมูลผู้ประสานงาน</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ mb: 1 }}>
                    <TypographyInLine
                      title="ชื่อผู้ประสานงาน"
                      subtitle="ไม่บังคับ"
                    />
                    <Input
                      name="assistant.full_name"
                      id="assistant.full_name"
                      control={control}
                      rules={{
                        required: isRequired && "กรุณาระบุชื่อผู้ประสานงาน",
                      }}
                      placeholder="ระบุชื่อผู้ประสานงาน"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 1 }}>
                    <TypographyInLine
                      title="เบอร์โทรติดต่อ"
                      subtitle="ไม่บังคับ"
                    />
                    <Input
                      control={control}
                      name="assistant.phone"
                      id="assistant.phone"
                      maxLength={10}
                      rules={{
                        required: isRequired && "กรุณาระบุเบอร์โทร",
                        validate: {
                          maxLength: (v: string) =>
                            v.length <= 50 ||
                            "เบอร์โทรติดต่อต้องน้อยกว่า 50 ตัวอักษร",
                        },
                      }}
                      placeholder="ระบุเบอร์โทรติดต่อ"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mb: 1 }}>
                    <TypographyInLine
                      title="อีเมลติดต่อ"
                      subtitle="ไม่บังคับ"
                    />
                    <Input
                      control={control}
                      name="assistant.email"
                      id="assistant.email"
                      rules={{
                        required: isRequired && "กรุณาระบุอีเมล",
                        validate: isRequired && {
                          maxLength: (v: string) =>
                            v.length <= 50 || "อีเมลต้องน้อยกว่า 50 ตัวอักษร",
                          matchPattern: (v: string) =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "รูปแบบอีเมลไม่ถูกต้อง",
                        },
                      }}
                      placeholder="ระบุอีเมล"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Box sx={{ mb: 1 }}>
                    <ButtonCustom type="submit" title="ถัดไป" />
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

export default Register;
