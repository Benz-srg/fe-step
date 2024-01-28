"use client";
import { useEffect, useState } from "react";
import ButtonCustom from "@/components/form/ButtonCustom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { useForm } from "react-hook-form";
import Input from "@/components/form/Input";
import TableRole from "./tablerole";
import SwitchHook from "../form/SwitchHook";
import { IAdmin } from "@/types/admin.type";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useStore } from "@nanostores/react";
import { $user } from "@/app/store/user";

type TPropsFormAdmin = {
  type: "create" | "edit";
  onSubmit: (data: any) => void;
  handleChangeFile: (file: File) => void;
  admin?: IAdmin;
  onCancle?: (data?: any) => void;
  handleToggleModalChangePassword?: () => void;
};

const manage_admins = [
  "role.add_admin",
  "role.edit_admin",
  "role.delete_admin",
  "role.edit_permission",
];

const manage_researcher = [
  "role.add_researcher",
  "role.edit_researcher",
  "role.delete_researcher",
  "role.reply_researcher",
  "role.see_of_request",
  "role.edit_of_request",
  "role.delete_of_request",
];

const UploadProfile = (props: any) => {
  return (
    <Button
      component="label"
      variant="contained"
      sx={{
        borderRadius: "50%",
        bgcolor: "#8272c3",
        m: 0,
        minWidth: 0,
        p: 0.3,
      }}
    >
      <EditIcon sx={{ color: "white" }} />
      <input
        type="file"
        accept="image/*"
        style={{
          clip: "rect(0 0 0 0)",
          clipPath: "inset(50%)",
          height: "1px",
          overflow: "hidden",
          position: "absolute",
          bottom: 0,
          left: 0,
          whiteSpace: "nowrap",
          width: "1px",
        }}
        onChange={(event: any) => props.onChangeFile(event.target.files[0])}
      />
    </Button>
  );
};

const FormAdmin = ({
  type,
  onSubmit,
  handleChangeFile,
  admin,
  onCancle,
  handleToggleModalChangePassword,
}: TPropsFormAdmin) => {
  const user = useStore($user);
  const [previewImage, setPreviewImg] = useState<string>("");
  const { control, handleSubmit, getValues, watch, setValue, reset } =
    useForm<any>({
      defaultValues: {
        full_name: "พิทักษ์ ครอบจักรวาล",
        department: "ผู้ช่วย",
        faculty: "วิทยาการคอมพิวเตอร์",
        email: "example.a@gmail.com",
        phone: "0987654321",
        user_type_id: 2,
        password: "1234",
        confirm_password: "1234",
        is_active: false,
        role: {
          add_researcher: true,
          edit_researcher: true,
          delete_researcher: true,
          reply_researcher: true,
          see_of_request: true,
          edit_of_request: true,
          delete_of_request: true,
          add_admin: true,
          edit_admin: true,
          delete_admin: true,
          edit_permission: true,
        },
        manage_request: true,
        manage_admin: true,
        img_profile: "",
      },
    });

  useEffect(() => {
    if (admin?.id) {
      const roles: any = admin.role;
      const isManageAdmin = manage_admins.every(
        (r) => roles[r.replace("role.", "")]
      );
      const isManageRequest = manage_researcher.every(
        (r) => roles[r.replace("role.", "")]
      );

      reset({
        full_name: admin.full_name,
        department: admin.department,
        faculty: admin.faculty,
        email: admin.email,
        phone: admin.phone,
        user_type_id: admin.user_type_id,
        password: "12345678",
        is_active: admin.is_active,
        role: {
          ...admin.role,
        },
        manage_request: isManageRequest,
        manage_admin: isManageAdmin,
        img_profile: admin.img_profile,
      });
    }
  }, [admin]);

  const handleOnSubmit = (data: any) => onSubmit(data);

  const handleChange = (e: any) => {
    const { role, manage_request, manage_admin } = getValues();
    const checkName = e.target.name;
    if (manage_admin && checkName == "manage_admin") {
      setValue("role.add_admin", true);
      setValue("role.edit_admin", true);
      setValue("role.delete_admin", true);
      setValue("role.edit_permission", true);
    } else if (checkName == "manage_admin") {
      setValue("role.add_admin", false);
      setValue("role.edit_admin", false);
      setValue("role.delete_admin", false);
      setValue("role.edit_permission", false);
    }

    if (manage_request && checkName == "manage_request") {
      setValue("role.add_researcher", true);
      setValue("role.edit_researcher", true);
      setValue("role.delete_researcher", true);
      setValue("role.reply_researcher", true);
      setValue("role.see_of_request", true);
      setValue("role.edit_of_request", true);
      setValue("role.delete_of_request", true);
    } else if (checkName == "manage_request") {
      setValue("role.add_researcher", false);
      setValue("role.edit_researcher", false);
      setValue("role.delete_researcher", false);
      setValue("role.reply_researcher", false);
      setValue("role.see_of_request", false);
      setValue("role.edit_of_request", false);
      setValue("role.delete_of_request", false);
    }

    if (manage_admins.includes(checkName)) {
      if (
        role.add_admin &&
        role.edit_admin &&
        role.delete_admin &&
        role.edit_permission
      ) {
        setValue("manage_admin", true);
      } else if (manage_admin) setValue("manage_admin", false);
    }

    if (manage_researcher.includes(checkName)) {
      if (
        role.add_researcher &&
        role.edit_researcher &&
        role.delete_researcher &&
        role.reply_researcher &&
        role.see_of_request &&
        role.edit_of_request &&
        role.delete_of_request
      ) {
        setValue("manage_request", true);
      } else if (manage_admin) setValue("manage_request", false);
    }
  };

  const onSetAdminType = (admin_type: number) => {
    setValue("user_type_id", admin_type);
  };

  const onChangeFile = (file: File) => {
    const maxFileSize = 2.5 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("ไฟล์มีขนาดใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 2.5 MB");
      return;
    }
    const urlImg = URL.createObjectURL(file);
    handleChangeFile(file);
    setPreviewImg(urlImg);
  };

  const avatarSrc =
    previewImage ||
    (admin?.img_profile
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/images/${admin.img_profile}`
      : "https://mui.com/static/images/avatar/1.jpg");

  const isAddOrEdit = (
    type == "create" ? !user.role?.add_admin : !user.role?.edit_admin
  ) as boolean;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      onChange={handleChange}
    >
      <Paper sx={{ p: 2 }} elevation={0}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Box
              sx={{
                border: "1px solid #e5e5e5",
                borderRadius: "10px",
                padding: 3,
                display: "flex",
                gap: "24px",
              }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={avatarSrc}
                  sizes="md"
                  sx={{ width: 80, height: 80 }}
                />
                <div style={{ position: "absolute", top: 0, right: 0 }}>
                  <UploadProfile onChangeFile={onChangeFile} />
                </div>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "16px" }}>
                  เพิ่มรูปโปรไฟล์
                </Typography>
                <Typography sx={{ fontSize: "14px" }} color="#a3a3a3">
                  ขนาดไฟล์ไม่ควรเกิน 2.5 MB
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography sx={{ pr: 3 }}>การใช้งาน:</Typography>{" "}
              <SwitchHook
                disabled={isAddOrEdit}
                control={control}
                name="is_active"
              />
            </Box>
            <Typography sx={{ pr: 1 }}>Role</Typography>{" "}
            <Box
              sx={{
                display: "flex",
                gap: "24px",
              }}
            >
              <Box flexGrow={1}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "10px",
                    borderColor:
                      watch("user_type_id") == 2 ? "#FAAC1E" : "#e5e5e5",
                    "&:hover": { borderColor: "#FAAC1E" },
                    "&:disabled": {
                      opacity: 0.7,
                    },
                  }}
                  disabled={isAddOrEdit}
                  onClick={() => onSetAdminType(2)}
                >
                  Admin
                </Button>
              </Box>
              <Box flexGrow={1}>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "10px",
                    borderColor:
                      watch("user_type_id") == 3 ? "#FAAC1E" : "#e5e5e5",
                    "&:hover": { borderColor: "#FAAC1E" },
                    "&:disabled": {
                      opacity: 0.7,
                    },
                  }}
                  disabled={isAddOrEdit}
                  onClick={() => onSetAdminType(3)}
                >
                  Super Admin
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">ชื่อ</Typography>
              <Input
                disabled={isAddOrEdit}
                name="full_name"
                id="full_name"
                control={control}
                rules={{
                  required: "กรุณาระบุชื่อ",
                }}
                placeholder="ระบุชื่อ"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">ตำแหน่ง/แผนก</Typography>
              <Input
                disabled={isAddOrEdit}
                name="department"
                id="department"
                control={control}
                rules={{
                  required: "กรุณาระบุชื่อ",
                }}
                placeholder="ระบุชื่อ"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">เบอร์โทรติดต่อ</Typography>
              <Input
                disabled={isAddOrEdit}
                name="phone"
                id="phone"
                control={control}
                rules={{
                  required: "กรุณาระบุเบอร์โทรติดต่อ",
                }}
                placeholder="ระบุเบอร์โทรติดต่อ"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">อีเมล์ติดต่อ</Typography>
              <Input
                disabled={isAddOrEdit}
                name="email"
                id="email"
                control={control}
                rules={{
                  required: "กรุณาระบุอีเมล์ติดต่อ",
                  validate: {
                    maxLength: (v: string) =>
                      v.length <= 50 || "อีเมล์ต้องน้อยกว่า 50 ตัวอักษร",
                    matchPattern: (v: string) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      "รูปแบบอีเมล์ไม่ถูกต้อง",
                  },
                }}
                placeholder="ระบุอีเมล์ติดต่อ"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ mb: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2">รหัสผ่าน</Typography>
                {admin?.id ? (
                  <Typography
                    sx={{
                      color: "#6869ac",
                      pl: 1,
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={handleToggleModalChangePassword}
                  >
                    เปลี่ยนรหัสผ่าน
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              <Input
                disabled={
                  (type == "create" ? !user.role?.add_admin : true) as boolean
                }
                name="password"
                id="password"
                control={control}
                rules={{
                  required: "กรุณาระบุรหัสผ่าน",
                }}
                placeholder="ระบุรหัสผ่าน"
                type="password"
              />
            </Box>
          </Grid>
          {!admin?.id && (
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">ยืนยันรหัสผ่าน</Typography>
                <Input
                  disabled={isAddOrEdit}
                  name="confirm_password"
                  id="confirm_password"
                  type="password"
                  control={control}
                  rules={
                    admin?.id
                      ? {}
                      : {
                          required: "กรุณาระบุยืนยันรหัสผ่าน",
                          validate: (val: string) => {
                            if (watch("password") != val) {
                              return "ยืนยันรหัสผ่านไม่ตรงกัน";
                            }
                          },
                        }
                  }
                  placeholder="ระบุยืนยันรหัสผ่าน"
                />
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography>สิทธิ์การเข้าถึง</Typography>
          </Grid>
          <TableRole
            control={control}
            isEdit={!user.role?.edit_permission as boolean}
          />
        </Grid>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#000",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          py: 2,
          px: 3,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ButtonCustom
            type="button"
            title="ยกเลิก"
            background="white"
            hoverbg="#dfdfdf"
            onClick={onCancle}
          />
          <ButtonCustom type="submit" title="ยืนยัน" disabled={isAddOrEdit} />
        </div>
      </Paper>
    </Box>
  );
};

export default FormAdmin;
