import React from "react";
import { IAdmin } from "@/types/admin.type";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonCustom from "../form/ButtonCustom";
import { useRouter } from "next/navigation";
import { useStore } from "@nanostores/react";
import { $user } from "@/app/store/user";

type Props = {
  admin: IAdmin;
  onEdit: () => void;
};

const View = ({ admin, onEdit }: Props) => {
  const router = useRouter();
  const user = useStore($user);
  return (
    <Paper elevation={0} sx={{ minHeight: "86vh", position: "relative" }}>
      <Box sx={{ padding: "32px 32px 0 32px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            mb: 2,
            border: "1px solid #ebebeb",
            borderRadius: "10px",
            p: 3,
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={
              admin.img_profile
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/images/${admin.img_profile}`
                : "https://mui.com/static/images/avatar/1.jpg"
            }
            sizes="md"
            sx={{ width: 80, height: 80 }}
          />
          <Box>
            <Typography sx={{ fontSize: "12px" }}>
              {admin.user_type_id == 2 ? "Admin" : "Super Admin"}
            </Typography>
            <Typography variant="h6" component="h4">
              {admin.full_name}
            </Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography>ตำแหน่ง/แผนก: {admin.department}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>เบอร์โทรติดต่อ : {admin.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography>อีเมล์ติดต่อ: {admin.email}</Typography>
          </Grid>
        </Grid>
        {/* permission */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography>สิทธิ์การเข้าถึง</Typography>
          </Grid>
          {admin.role.add_researcher && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.add_researcher} />}
                label="เพิ่มข้อมูลนักวิจัย"
              />
            </Grid>
          )}
          {admin.role.add_admin && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.add_admin} />}
                label="เพิ่มข้อมูลผู้ดูแลระบบ"
              />
            </Grid>
          )}
          {admin.role.edit_researcher && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.edit_researcher} />}
                label="แก้ไขข้อมูลนักวิจัย"
              />
            </Grid>
          )}
          {admin.role.edit_admin && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.edit_admin} />}
                label="แก้ไขข้อมูลผู้ดูแลระบบ"
              />
            </Grid>
          )}
          {admin.role.delete_researcher && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.delete_researcher} />}
                label="ลบข้อมูลนักวิจัย"
              />
            </Grid>
          )}
          {admin.role.delete_admin && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.delete_admin} />}
                label="ลบข้อมูลผู้ดูแลระบบ"
              />
            </Grid>
          )}
          {admin.role.reply_researcher && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.reply_researcher} />}
                label="ตอบกลับให้คำปรึกษานักวิจัย"
              />
            </Grid>
          )}
          {admin.role.edit_permission && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.edit_permission} />}
                label="แก้ไขสิทธิ์การเข้าถึง"
              />
            </Grid>
          )}
          {admin.role.see_of_request && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.see_of_request} />}
                label="ดูรายการขอคำร้อง"
              />
            </Grid>
          )}
          {admin.role.edit_of_request && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.edit_of_request} />}
                label="แก้ไขสถานะรายการคำร้อง"
              />
            </Grid>
          )}
          {admin.role.delete_of_request && (
            <Grid item xs={6} sm={6}>
              <FormControlLabel
                control={<Checkbox checked={admin.role.delete_of_request} />}
                label="ลบรายการขอคำร้อง"
              />
            </Grid>
          )}
        </Grid>
      </Box>
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
          bottom: 0,
          position: "absolute",
          width: "100%",
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
            onClick={() => router.back()}
          />
          <ButtonCustom
            type="button"
            title="แก้ไข"
            onClick={() => onEdit()}
            disabled={!user.role?.edit_admin}
          />
        </div>
      </Paper>
    </Paper>
  );
};

export default View;
