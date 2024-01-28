import ButtonUpload from "@/components/form/ButtonUpload";
import {
  Typography,
  Box,
  Divider,
  TextField,
  IconButton,
  Grid,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IFormProject } from "@/types/project.type";
import Input from "@/components/form/Input";
import Cardfileupload from "@/components/form/cardfileupload";
import { useForm } from "react-hook-form";
import ButtonCustom from "@/components/form/ButtonCustom";
import CheckboxHook from "@/components/form/Checkbox";
import formatUtils from "@/app/utils/format";

type Props = {
  form: IFormProject;
  handleNextState: (data: IFormProject, state: number) => void;
};

const Formstateone = ({ form, handleNextState }: Props) => {
  const { control, handleSubmit, getValues } = useForm<IFormProject>({
    defaultValues: {
      head_of_project: form.head_of_project,
      department: form.department,
      faculty: form.faculty,
      phone: form.phone,
      office_phone: form.office_phone,
      email: form.email,
      name_th: form.name_th,
      name_en: form.name_en,
      is_research_document: form.is_research_document,
      is_contract_document: form.is_contract_document,
      is_permission_document: form.is_permission_document,
      is_other_document: form.is_other_document,
      user_assistant: {
        email: "",
        full_name: "",
        phone: "",
      },
      files: {
        research_document: "",
        permission_document: "",
        contract_document: "",
        other_document: "",
      },
    },
  });
  const [previewFiles, setPreviewFiles] = useState({
    research_document: "",
    permission_document: "",
    contract_document: "",
    other_document: "",
  });

  const handleOnSubmit = (data: any) => {
    handleNextState(data, 2);
  };

  const handleChangeForm = () => {
    const { files } = getValues();

    const fileItems: any = files;
    const previewFilesState: any = {
      ...previewFiles,
    };

    const fileTypes = [
      "research_document",
      "permission_document",
      "contract_document",
      "other_document",
    ];

    fileTypes.forEach((fileType) => {
      const file = fileItems[fileType];
      if (file) {
        previewFilesState[fileType] = `${
          file[0].name
        } (${formatUtils.formatBytes(file[0].size)})`;
      } else {
        previewFilesState[fileType] = "";
      }
    });

    setPreviewFiles(previewFilesState);
  };

  const handleRemove = () => {};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      onChange={handleChangeForm}
    >
      <Paper elevation={0} sx={{ p: 3 }}>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">
                  1.ข้อมูลหัวหน้าโครงการ/ผู้ให้ข้อมูล
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">ชื่อหัวหน้าโครงการ</Typography>
                <Input
                  name="head_of_project"
                  id="head_of_project"
                  control={control}
                  rules={{
                    required: "กรุณาระบุชื่อหัวหน้าโครงการ",
                  }}
                  placeholder="ระบุชื่อหัวหน้าโครงการ"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">สังกัดภาควิชา/คณะ</Typography>
                <Input
                  control={control}
                  name="faculty"
                  id="faculty"
                  rules={{
                    required: "กรุณาระบุชื่อสังกัดภาควิชา/คณะ",
                  }}
                  placeholder="ระบุชื่อสังกัดภาควิชา/คณะ"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">มหาวิทยาลัย/หน่วยงาน</Typography>
                <Input
                  control={control}
                  name="department"
                  id="department"
                  rules={{
                    required: "กรุณาระบุมหาวิทยาลัย/หน่วยงาน",
                  }}
                  placeholder="ระบุมหาวิทยาลัย/หน่วยงาน"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">โทรศัพท์เคลื่อนที่</Typography>
                <Input
                  control={control}
                  name="phone"
                  id="phone"
                  rules={{
                    required: "กรุณาระบุโทรศัพท์เคลื่อนที่",
                  }}
                  placeholder="ระบุโทรศัพท์เคลื่อนที่"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">โทรศัพท์สำนักงาน</Typography>
                <Input
                  control={control}
                  name="office_phone"
                  id="office_phone"
                  rules={{
                    required: "กรุณาระบุโทรศัพท์สำนักงาน",
                  }}
                  placeholder="ระบุโทรศัพท์สำนักงาน"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">อีเมล</Typography>
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
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "รูปแบบอีเมลไม่ถูกต้อง",
                    },
                  }}
                  placeholder="ระบุอีเมล"
                />
              </Box>
            </Grid>
            {/* tag2 */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">2.ชื่อผลงาน/การประดิษฐ์</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">
                  ชื่อผลงาน/การประดิษฐ์ (ภาษาไทย)
                </Typography>
                <Input
                  control={control}
                  name="name_th"
                  id="name_th"
                  rules={{
                    required: "กรุณาระชื่อผลงาน/การประดิษฐ์ (ภาษาไทย)",
                    validate: {
                      matchPattern: (v: string) =>
                        /^[ก-๙เ๑-๙0-9]+$/.test(v) || "กรุณาระบุภาษาไทยเท่านั้น",
                    },
                  }}
                  placeholder="ระบุชื่อผลงาน/การประดิษฐ์ (ภาษาไทย)"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">
                  ชื่อผลงาน/การประดิษฐ์ (ภาษาอังกฤษ)
                </Typography>
                <Input
                  control={control}
                  name="name_en"
                  id="name_en"
                  rules={{
                    required: "กรุณาระบุอีเมล",
                    validate: {
                      matchPattern: (v: string) =>
                        /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/.test(
                          v
                        ) || "กรุณาระบุภาษาอังกฤษเท่านั้น",
                    },
                  }}
                  placeholder="ระบุอีเมล"
                />
              </Box>
            </Grid>
            {/*  end tag2 */}
            {/* tag3 */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">
                  3.เอกสารแนบ (ถ้ามี) Info
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CheckboxHook
                  name="is_research_document"
                  control={control}
                  label="เอกสารงานวิจัย"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                {previewFiles.research_document ? (
                  <Cardfileupload title={previewFiles.research_document} />
                ) : (
                  <ButtonUpload
                    control={control}
                    name="files.research_document"
                    rules={
                      getValues("is_research_document")
                        ? {
                            required: "กรุณาอัพโหลดเอกสารงานวิจัย",
                          }
                        : {}
                    }
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CheckboxHook
                  name="is_permission_document"
                  control={control}
                  label="เอกสารสัญญารับทุนวิจัย (ถ้ามี)"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Box sx={{ mb: 1 }}>
                  {previewFiles.permission_document ? (
                    <Cardfileupload title={previewFiles.permission_document} />
                  ) : (
                    <ButtonUpload
                      control={control}
                      name="files.permission_document"
                      rules={
                        getValues("is_permission_document")
                          ? {
                              required: "กรุณาอัพโหลดเอกสารสัญญารับทุนวิจัย",
                            }
                          : {}
                      }
                    />
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CheckboxHook
                  name="is_contract_document"
                  control={control}
                  label="เอกสารขออนุญาใช้สิทธิจากแหล่งทุน (ถ้ามี)"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                {previewFiles.contract_document ? (
                  <Cardfileupload title={previewFiles.contract_document} />
                ) : (
                  <ButtonUpload
                    control={control}
                    name="files.contract_document"
                    rules={
                      getValues("is_contract_document")
                        ? {
                            required:
                              "กรุณาอัพโหลดเอกสารขออนุญาใช้สิทธิจากแหล่งทุน",
                          }
                        : {}
                    }
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <CheckboxHook
                  name="is_other_document"
                  control={control}
                  label="เอกสารอื่น ๆ (ถ้ามี)"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              {previewFiles.other_document ? (
                <Cardfileupload title={previewFiles.other_document} />
              ) : (
                <ButtonUpload
                  control={control}
                  name="files.other_document"
                  rules={
                    getValues("is_other_document")
                      ? {
                          required: "กรุณาอัพโหลดเอกสารอื่น",
                        }
                      : {}
                  }
                />
              )}
            </Grid>
            {/* end tag3 */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">ข้อมูลผู้ประสานงาน</Typography>
              </Box>
              <FormControlLabel
                control={<Checkbox value={false} />}
                label="ใช้ข้อมูลผู้ใช้งานบัญชีนี้ในระบบ"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">
                  ชื่อผู้ประสานงาน (ไม่บังคับ)
                </Typography>
                <Input
                  control={control}
                  name="user_assistant.full_name"
                  id="user_assistant.full_name"
                  placeholder="ระบุโทรศัพท์สำนักงาน"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">
                  เบอร์โทรติดต่อ (ไม่บังคับ)
                </Typography>
                <Input
                  control={control}
                  name="user_assistant.phone"
                  id="user_assistant.phone"
                  placeholder="ระบุโทรศัพท์สำนักงาน"
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2">
                  อีเมลติดต่อ (ไม่บังคับ)
                </Typography>
                <Input
                  control={control}
                  name="user_assistant.email"
                  id="user_assistant.email"
                  rules={{
                    required: false,
                    validate: {
                      maxLength: (v: string) =>
                        v.length
                          ? v.length <= 50 || "อีเมลต้องน้อยกว่า 50 ตัวอักษร"
                          : true,
                      matchPattern: (v: string) =>
                        v.length
                          ? /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || "รูปแบบอีเมลไม่ถูกต้อง"
                          : true,
                    },
                  }}
                  placeholder="อีเมลติดต่อ"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
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
            textAlign: "right",
          }}
        >
          <ButtonCustom type="submit" title="ถัดไป" />
        </div>
      </Paper>
    </Box>
  );
};

export default Formstateone;
