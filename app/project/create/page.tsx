"use client";
import Layout from "@/components/layout/layout";
import ArrowStep from "@/components/project/ArrowStep";
import Formstateone from "@/components/project/create/formstateone";
import Formstatethree from "@/components/project/create/formstatethree";
import Formstatetwo from "@/components/project/create/formstatetwo";
import fileService from "@/services/file.service";
import projectService from "@/services/project.service";
import { IFormProject } from "@/types/project.type";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
const FormData = require("form-data");

import dayjs from "dayjs";
import { useEffect, useState } from "react";

type TState = {
  row_count: number;
  form: IFormProject;
  state: number;
};

const CreateProject = () => {
  const [state, setState] = useState<TState>({
    row_count: 0,
    state: 3,
    form: {
      head_of_project: "asd",
      department: "asd",
      faculty: "asd",
      phone: "asd",
      office_phone: "asdad",
      email: "g@gmail.com",
      name_th: "ทดสอบไทย",
      name_en: "bb",
      is_research_document: false,
      is_contract_document: false,
      is_permission_document: false,
      is_other_document: false,
      differences_from_jobs: "5555+",
      files_attachments_detail: "ลอง ๆ เล่นกันดู",
      publication_infomation: {
        never_published: true,
        ever_published: true,
        date_published: dayjs().toISOString(),
      },
      show_invention: {
        is_show: true,
        title: "ทดสอบจ๊ะ",
        show_event_title: "ทดสอบอีเว้นต์",
        show_date: dayjs().toISOString(),
      },
      award_information: {
        is_received: true,
        title: "ทดสอบจ๊ะ",
        department: "aaa",
        reveived_date: dayjs().toISOString(),
      },
      funding_information: {
        not_received: true,
        received: true,
        received_from: "ได้รับจาก",
        according_no: "เลขที่",
        results: "เลขที่",
      },
      user_assistant: {
        id: 1,
        email: "gmail@gmail.com",
        full_name: "asdasdasd",
        phone: "0610816456",
      },
      files: {},
    },
  });
  useEffect(() => {}, []);

  const handleNextState = (data: IFormProject, nextState: number) => {
    const newState = {
      ...state,
      state: state.state === 3 ? state.state : nextState,
      form: {
        ...state.form,
        ...data,
        files: {
          ...state.form.files,
          ...data.files,
        },
      },
    };
    setState(newState);
    if (newState.state === 3) createRequest(newState.form);
  };

  const handlePrevState = () =>
    setState((preObj) => ({ ...preObj, state: state.state - 1 }));

  const createRequest = async (bodyProject: IFormProject) => {
    try {
      console.log(state.form);
      let payload: any = Object.assign({}, state.form);
      delete payload.user_assistant;
      // alert("สร้างคำร้องขอเรียบร้อย");
      await projectService.create(payload);
    } catch (error) {}
  };

  return (
    <Layout>
      <main style={{ display: "flex", flexDirection: "column" }}>
        <Typography component="p" variant="h5" sx={{ mb: 1 }}>
          ข้อมูลผลงาน/การประดิษฐ์เบื่องต้น
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                py: 4,
                borderRadius: 3,
              }}
            >
              <ArrowStep step={1} active={state.state == 1} />
              <Typography sx={{ pl: 3 }} variant="body2">
                ข้อมูลผู้ประดิษ์
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                py: 4,
                borderRadius: 3,
              }}
            >
              <ArrowStep step={2} active={state.state == 2} />
              <div>
                <Typography sx={{ pl: 3 }} variant="body2">
                  ข้อมูลทางเทคนิคของการประดิษฐ์ / ภาพของการออกแบบผลิตภัณฑ์
                </Typography>
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                py: 4,
                borderRadius: 3,
              }}
            >
              <ArrowStep step={3} active={state.state == 3} />
              <Typography sx={{ pl: 3 }} variant="body2">
                ข้อมูลของการประดิษฐ์/การออกแบบผลิตภัณฑ์
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {state.state == 1 && (
          <Formstateone form={state.form} handleNextState={handleNextState} />
        )}
        {state.state == 2 && (
          <Formstatetwo
            form={state.form}
            handleNextState={handleNextState}
            handlePrevState={handlePrevState}
          />
        )}
        {state.state == 3 && (
          <Formstatethree
            state={state.state}
            form={state.form}
            handleNextState={handleNextState}
            handlePrevState={handlePrevState}
          />
        )}
      </main>
    </Layout>
  );
};

export default CreateProject;
