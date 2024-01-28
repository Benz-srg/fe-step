"use client";
import { useEffect, useState, useRef } from "react";
import Layout from "@/components/layout/layout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { IUserlist } from "@/types/user.type";
import Typography from "@mui/material/Typography";

import adminService from "@/services/admin.service";
import FormAdmin from "@/components/admin/form";
import fileService from "@/services/file.service";
import { useParams } from "next/navigation";
import View from "@/components/admin/view";
import {
  IAdmin,
  IPayloadAdmin,
  IPayloadChangePassword,
} from "@/types/admin.type";
import ModalChangePassword from "@/components/admin/modalchangepassword";

type TState = {
  img_profile: any;
  select_profile: any;
  admin: IAdmin;
  is_edit: boolean;
  modal_changepassword: boolean;
};

const ViewAdmin = () => {
  const { id } = useParams();

  const [state, setState] = useState<TState>({
    img_profile: "",
    select_profile: null,
    is_edit: false,
    modal_changepassword: false,
    admin: {
      id: "7f6fc6e3-933c-4fec-9408-16c7ab24b69c",
      full_name: "พิทักษ์ ครอบจักรวาล",
      department: "ผู้ช่วย",
      faculty: "วิทยาการคอมพิวเตอร์",
      email: "example.a@gmail.com",
      phone: "0987654321",
      is_active: true,
      img_profile: "istockphoto-1294372067-1024x1024.jpg",
      user_type_id: 2,
      created_at: "2023-09-09T15:44:23.462Z",
      updated_at: "2023-09-09T15:44:23.801Z",
      user_assistant_id: null,
      role: {
        id: 5,
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
      type: {
        id: 2,
        name: "ผู้ดูแลระบบ",
      },
    },
  });
  const firstRender = useRef<boolean>(false);

  useEffect(() => {
    if (firstRender.current) return;
    firstRender.current = true;

    findOne();
  }, []);

  const findOne = async () => {
    try {
      const { data } = await adminService.findOne(id as string);
      setState((r) => ({ ...r, admin: data }));
    } catch (error) {}
  };

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
      delete objData.manage_admin;
      delete objData.manage_request;
      delete objData.confirm_password;
      delete objData.password;
      delete objData.img_profile;
      const payload: IPayloadAdmin = Object.assign({}, objData);

      const { data } = await adminService.update(
        state.admin.id,
        payload as IPayloadAdmin
      );

      if (state.select_profile) {
        const formFilesUpload = new FormData();
        formFilesUpload.append("file", state.select_profile);
        await fileService.uploadImgProfile(state.admin.id, formFilesUpload);
      }
      await findOne();
      setState((r) => ({ ...r, is_edit: false }));

      alert("เรียบร้อย");
    } catch (error) {
      console.error(error);
      alert("ล้มเหลว");
    }
  };

  const handleStep = () => {
    setState((prev) => ({ ...prev, is_edit: !prev.is_edit }));
  };

  const handleToggleModal = () =>
    setState((r) => ({
      ...r,
      modal_changepassword: !r.modal_changepassword,
    }));

  const handleSubmitChangePassword = async (
    payload: IPayloadChangePassword
  ) => {
    try {
      await adminService.changepassword(state.admin.id, payload);
      await findOne();
      setState((r) => ({ ...r, modal_changepassword: false }));
      alert("เรียบร้อย");
    } catch (error) {
      console.error(error);
      alert("ล้มเหลว");
    }
  };

  return (
    <Layout>
      <main>
        {/* <Box
          sx={{
            marginBottom: 1,
          }}
        >
          <Typography variant="h5" component="h2">
            สร้าง Admin
          </Typography>
        </Box> */}
        <ModalChangePassword
          open={state.modal_changepassword}
          handleToggleModal={handleToggleModal}
          onSubmit={handleSubmitChangePassword}
        />
        <Paper sx={{ p: 0 }} elevation={0}>
          {!state.is_edit && <View admin={state.admin} onEdit={handleStep} />}
          {state.is_edit && state.admin?.id && (
            <FormAdmin
              type="edit"
              onSubmit={handleOnSubmit}
              handleChangeFile={handleChangeFile}
              admin={state.admin}
              onCancle={handleStep}
              handleToggleModalChangePassword={handleToggleModal}
            />
          )}
        </Paper>
      </main>
    </Layout>
  );
};

export default ViewAdmin;
