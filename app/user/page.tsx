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
import { InputAdornment, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Input from "@/components/form/Input";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@/components/form/pagination";
type TState = {
  lists: IUserlist[];
  row_count: number;
  loadComponent: boolean;
};

const limits = [
  { key: 5, value: 5 },
  { key: 10, value: 10 },
  { key: 15, value: 15 },
  { key: 20, value: 20 },
  { key: 25, value: 25 },
];

const User = () => {
  const [state, setState] = useState<TState>({
    lists: [],
    row_count: 0,
    loadComponent: false,
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
      const { data } = await userService.list({ page, page_size, full_name });
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
          <Link prefetch={false} href={"/project/create"}>
            <ButtonCustom
              type="button"
              title={
                <div
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {<AddIcon sx={{ mr: 1 }} />}สร้างผู้ใช้ใหม่
                </div>
              }
            />
          </Link>
        </Box>
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
          {/* <TableUser data={state.lists} /> */}
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
