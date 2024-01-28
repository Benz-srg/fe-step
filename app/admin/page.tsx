"use client";
import { useEffect, useState, useRef } from "react";
import ButtonCustom from "@/components/form/ButtonCustom";
import Layout from "@/components/layout/layout";
import TableUser from "@/components/user/Table";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import userService from "@/services/user.service";
import { IUserlist } from "@/types/user.type";
import SelectCustom from "@/components/form/selectcustom";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";

import { useForm } from "react-hook-form";
import Input from "@/components/form/Input";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/components/form/pagination";
import adminService from "@/services/admin.service";
import { useRouter } from "next/navigation";
import ModalCustom from "@/components/modal";
import { IAdmin } from "@/types/admin.type";
import { useStore } from "@nanostores/react";
import { $user } from "@/app/store/user";

type TState = {
  lists: IAdmin[];
  row_count: number;
  loadComponent: boolean;
  modal_delete: boolean;
  user_id: string | null;
  is_active: boolean;
  typeModal: string;
};

const limits = [
  { key: 5, value: 5 },
  { key: 10, value: 10 },
  { key: 15, value: 15 },
  { key: 20, value: 20 },
  { key: 25, value: 25 },
];

const User = () => {
  const user = useStore($user);
  const router = useRouter();
  const [state, setState] = useState<TState>({
    lists: [],
    row_count: 0,
    loadComponent: false,
    modal_delete: false,
    user_id: null,
    is_active: false,
    typeModal: "",
  });
  const firstRender = useRef<boolean>(false);
  const searchRef = useRef<NodeJS.Timeout | null>(null);
  const { control, handleSubmit, getValues, watch } = useForm<any>({
    defaultValues: {
      page: 1,
      page_size: 5,
      full_name: "",
    },
  });
  useEffect(() => {
    if (firstRender.current) return;
    firstRender.current = true;
    feedLists();
  }, []);

  const [page, page_size] = watch(["page_size", "page"]);
  useEffect(() => {
    if (state.loadComponent) feedLists();
  }, [page_size, page]);

  const feedLists = async () => {
    try {
      const [page, page_size, full_name] = getValues([
        "page",
        "page_size",
        "full_name",
      ]);
      const { data } = await adminService.list({ page, page_size, full_name });
      setState((r) => ({
        ...r,
        lists: data.data,
        row_count: data.count,
        loadComponent: true,
      }));
    } catch (error) {}
  };

  const handleChangeState = () => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      feedLists();
    }, 1000);
  };

  // { title: "แก้ไข", action: () => "" },
  // { title: "ลบ", action: () => "" },

  const onActions = (key: string, user_id: any, is_active?: boolean) => {
    if (key === "edit") {
      return router.push(`admin/${user_id}`);
    }

    if (key === "delete") {
      handleModel({ user_id, type: "delete" });
    }

    if (key === "suspended") {
      handleModel({ user_id, is_active, type: "suspended" });
    }
  };

  const handleModel = (data?: {
    user_id?: string;
    is_active?: boolean;
    type?: string;
  }) =>
    setState((r) => ({
      ...r,
      modal_delete: !r.modal_delete,
      user_id: data?.user_id || "",
      is_active: data?.is_active || false,
      typeModal: data?.type || "",
    }));

  const onBannned = async (user_id: string) => {
    try {
      await adminService.suspended(user_id);
      handleModel();
      await feedLists();
      // alert(state.is_active ? "ระงับ" : "ปลดระงับ" + "เรียบร้อย");
      alert("ระงับการใช้งานเรียบร้อย");
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (user_id: string) => {
    try {
      await adminService.delete(user_id);
      handleModel();
      await feedLists();
      alert("ลบเรียบร้อย");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            marginBottom: 1,
          }}
        >
          <div></div>
          <Link prefetch={false} href={"/admin/create"}>
            <ButtonCustom
              disabled={!user.role?.add_admin}
              type="button"
              title={
                <div
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {<AddIcon sx={{ mr: 1 }} />}สร้าง Admin
                </div>
              }
            />
          </Link>
        </Box>
        <ModalCustom
          open={state.modal_delete}
          onClose={handleModel}
          width="459px"
          disabledOutside
        >
          <Box textAlign="center">
            <Box gap={10}>
              <Typography
                sx={{ fontWeight: 500, fontSize: "20px", lineHeight: "29.9px" }}
              >
                {state.typeModal == "delete"
                  ? "ลบการใช้งานผู้ใช้นี้หรือไม่"
                  : "ปิดการใช้งานผู้ใช้นี้หรือไม่"}
              </Typography>
              <Typography
                sx={{
                  fontWeight: 300,
                  fontSize: "16px",
                  lineHeight: "23.92px",
                  whiteSpace: "pre-line",
                }}
              >
                {state.typeModal == "delete"
                  ? "หากลบการใช้งานของผู้ใช้นี้แล้ว"
                  : "หากปิดการใช้งานของผู้ใช้นี้แล้ว"}
                หากปิดการใช้งานของผู้ใช้นี้แล้ว
                <br />
                {state.typeModal == "delete"
                  ? "จะไม่สามารถกลับมาใช้งานได้อีก"
                  : "ท่านสามารถกลับมาเปิดการใช้งานได้อีกครั้ง"}
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <ButtonCustom
                type="button"
                title="ยืนยัน"
                fullWidth
                onClick={() =>
                  state.typeModal == "delete"
                    ? onDelete(state.user_id as string)
                    : onBannned(state.user_id as string)
                }
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <ButtonCustom
                type="button"
                title="ยกเลิก"
                fullWidth
                variant="outlined"
                background="inherit"
                hoverbg="inherit"
                onClick={handleModel}
              />
            </Box>
          </Box>
        </ModalCustom>
        <Paper sx={{ p: 1 }} elevation={0}>
          <Box
            component="form"
            onChange={handleChangeState}
            sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ width: "40%" }}>
              <Input
                name="full_name"
                id="full_name"
                control={control}
                placeholder="ค้นหาชื่ออาจารย์/นักวิจิย"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2">แสดง</Typography>{" "}
              <Box sx={{ width: 70 }}>
                <SelectCustom
                  name="page_size"
                  id="page_size"
                  options={limits}
                  control={control}
                />
              </Box>
              <Typography variant="body2">
                จาก {state.row_count} รายการ
              </Typography>
            </Box>
          </Box>
          <TableUser data={state.lists} onActions={onActions} />
          <Box sx={{ mt: 1 }}>
            <Pagination
            // currentPage={1}
            // totalPages={10}
            // onPageChange={() => ""}
            />
          </Box>
        </Paper>
      </main>
    </Layout>
  );
};

export default User;
