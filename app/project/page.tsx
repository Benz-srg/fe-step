"use client";
import ButtonCustom from "@/components/form/ButtonCustom";
import Layout from "@/components/layout/layout";
import TableProject from "@/components/project/Table";
import projectService from "@/services/project.service";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { IProject } from "@/types/project.type";
import { useForm } from "react-hook-form";
import SelectCustom from "@/components/form/selectcustom";
import projectStatusService from "@/services/project_status.service";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@/components/form/Input";

const limits = [
  { key: 5, value: 5 },
  { key: 10, value: 10 },
  { key: 15, value: 15 },
  { key: 20, value: 20 },
  { key: 25, value: 25 },
];

type TState = {
  lists: IProject[];
  row_count: number;
  project_status: any[];
  loadComponent: boolean;
};

const Petition = () => {
  const [state, setState] = useState<TState>({
    lists: [],
    row_count: 0,
    project_status: [],
    loadComponent: false,
  });
  const searchRef = useRef<NodeJS.Timeout | null>(null);
  const firstRender = useRef<boolean>(false);

  const { control, getValues, watch } = useForm<any>({
    defaultValues: {
      page: 1,
      page_size: 5,
      full_name: "",
      status: "",
      b: "",
      a: "",
    },
  });
  useEffect(() => {
    if (firstRender.current) return;
    firstRender.current = true;

    Promise.allSettled<
      [ReturnType<typeof feedLists>, ReturnType<typeof getProjectStatus>]
    >([feedLists(), getProjectStatus()]).then((data) => {
      const [, projectStatusPromiseResult] = data;
      if (projectStatusPromiseResult.status === "fulfilled") {
        setState((prevState) => ({
          ...prevState,
          project_status: projectStatusPromiseResult.value,
        }));
      } else {
        console.error(
          "Error fetching project status:",
          projectStatusPromiseResult.reason
        );
      }
    });
  }, []);

  const [page, page_size, status] = watch(["page_size", "page", "status"]);
  useEffect(() => {
    if (state.loadComponent) feedLists();
  }, [page_size, page, status]);

  const feedLists = async () => {
    try {
      const [page, page_size, full_name, status] = getValues([
        "page",
        "page_size",
        "full_name",
        "status",
      ]);
      let query: any = {};
      if (full_name) query.full_name = full_name;
      if (status) query.status = status;
      const { data } = await projectService.list({
        page,
        page_size,
        ...query,
      });
      setState((r) => ({
        ...r,
        lists: data.data,
        row_count: data.count,
        loadComponent: true,
      }));
    } catch (error) {}
  };

  const getProjectStatus = async () => {
    try {
      const { data } = await projectStatusService.list();
      return data;
    } catch (error) {
      return [];
    }
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SelectCustom
              name="a"
              id="a"
              placeholder="ประเภทร้อง"
              options={[
                {
                  key: 1,
                  value: "รับเรื่อง",
                },
                {
                  key: 2,
                  value: "ตรวจสอบเอกสาร",
                },
                {
                  key: 3,
                  value: "อยู่ระหว่างดำเนินการ",
                },
                {
                  key: 4,
                  value: "สำเร็จ",
                },
              ]}
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SelectCustom
              name="b"
              id="b"
              placeholder="ลักษณะสิ่งประดิษฐ์"
              options={[
                {
                  key: 1,
                  value: "รับเรื่อง",
                },
                {
                  key: 2,
                  value: "ตรวจสอบเอกสาร",
                },
                {
                  key: 3,
                  value: "อยู่ระหว่างดำเนินการ",
                },
                {
                  key: 4,
                  value: "สำเร็จ",
                },
              ]}
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SelectCustom
              name="status"
              id="status"
              placeholder="สถานะคำร้อง"
              options={state.project_status.map((r) => ({
                key: r.id,
                value: r.name,
              }))}
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={3} textAlign="end">
            <Link href={"/project/create"}>
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
                    {<AddIcon sx={{ mr: 1 }} />}สร้างคำร้อง
                  </div>
                }
              />
            </Link>
          </Grid>
        </Grid>

        <Paper sx={{ p: 1, mt: 2 }} elevation={0}>
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
          <TableProject data={state.lists} row_count={state.row_count} />
        </Paper>
      </main>
    </Layout>
  );
};

export default Petition;
