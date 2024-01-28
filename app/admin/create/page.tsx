"use client";
import { useState } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { IUserlist } from "@/types/user.type";
import Typography from "@mui/material/Typography";

import adminService from "@/services/admin.service";
import FormAdmin from "@/components/admin/form";
import fileService from "@/services/file.service";
import { useRouter } from "next/navigation";
type TState = {
  lists: IUserlist[];
  row_count: number;
  loadComponent: boolean;
  img_profile: any;
  select_profile: any;
};

const CreateAdmin = () => {
  const router = useRouter();
  const [state, setState] = useState<TState>({
    lists: [],
    row_count: 0,
    loadComponent: false,
    img_profile: "",
    select_profile: null,
  });

  const handleChangeFile = (file: File) => {
    const maxFileSize = 2.5 * 1024 * 1024;
    if (file.size > maxFileSize) {
      alert("ไฟล์มีขนาดใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 2.5 MB");
      return;
    }
    setState({ ...state, select_profile: file });
  };

  const handleOnSubmit = async (objData: any) => {
    try {
      const payload: any = Object.assign({}, objData);
      delete payload.manage_admin;
      delete payload.manage_request;
      delete payload.confirm_password;
      delete payload.img_profile;
      const { data } = await adminService.create(payload);

      if (state.select_profile) {
        const formFilesUpload = new FormData();
        formFilesUpload.append("file", state.select_profile);
        await fileService.uploadImgProfile(data.id, formFilesUpload);
      }

      alert("เรียบร้อย");
    } catch (error: any) {
      console.error(error);
      alert(error?.data?.message);
    }
  };

  return (
    <Layout>
      <main>
        <Box
          sx={{
            marginBottom: 1,
          }}
        >
          <Typography variant="h5" component="h2">
            สร้าง Admin
          </Typography>
        </Box>
        <Paper sx={{ p: 0 }} elevation={0}>
          <FormAdmin
            type="create"
            onSubmit={handleOnSubmit}
            handleChangeFile={handleChangeFile}
            onCancle={() => router.back()}
          />
        </Paper>
      </main>
    </Layout>
  );
};

export default CreateAdmin;
