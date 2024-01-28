import ButtonUpload from "@/components/form/ButtonUpload";
import {
  Typography,
  Box,
  Divider,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IFormProject } from "@/types/project.type";
import formatUtils from "@/app/utils/format";
import { useForm } from "react-hook-form";
import InputArea from "@/components/form/InputArea";
import ButtonCustom from "@/components/form/ButtonCustom";
import Cardfileupload from "@/components/form/cardfileupload";
type Props = {
  form: IFormProject;
  handleNextState: (data: any, nextStep: number) => void;
  handlePrevState: (state: number) => void;
};

const Formstatetwo = ({ form, handleNextState, handlePrevState }: Props) => {
  const [previewImages, setPreviewImages] = React.useState<File[]>([]);
  const { control, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      differences_from_jobs: form.differences_from_jobs,
      files_attachments_detail: form.files_attachments_detail,
      files: {
        files_attachments: [],
      },
    },
  });

  const handleOnSubmit = (data: any) => handleNextState(data, 3);

  const handleChange = () => {
    const { files } = getValues();
    const fileItems: any = files.files_attachments;

    if (fileItems) {
      const prev = [];
      for (const file of fileItems) {
        prev.push(file);
      }
      setPreviewImages(prev);
    }
  };

  const handleRemove = (index: number) => {
    const { files } = getValues();
    const { files_attachments } = files;
    const filesArray = Object.values(files_attachments);

    const filteredFiles = filesArray.filter((file, findex) => findex != index);
    setValue("files.files_attachments", filteredFiles);
    setPreviewImages(filteredFiles);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      onChange={handleChange}
    >
      <Paper sx={{ p: 3 }} elevation={0}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2">
              *สรุปลักษณะทางเทคนิคของงาน เช่น
              กรรมวิธี/กระบวนการ/ขั้นตอนการผลิต/ส่วนประกอบ/สูตร
              รวมถึงผลการวิจยหรือผลการทดลอง หรือภาพการออกแบบผลิตภัณฑ์
            </Typography>
          </Box>
          <Divider sx={{ mt: 2, mb: 2 }}></Divider>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2">
              จุดเด่นหรือข้อแตกต่างจากงานที่มีโดยทั่วไป
            </Typography>
            <InputArea
              name="differences_from_jobs"
              id="differences_from_jobs"
              control={control}
              rules={{
                required: "กรุณาระบุรายละเอียด",
              }}
              placeholder="ระบุรายละเอียด"
            />
          </Box>
          <Box>
            <Typography variant="body2">รายเอียดตามเอกสารแนบดังนี้</Typography>
            <InputArea
              name="files_attachments_detail"
              id="files_attachments_detail"
              control={control}
              rules={{
                required: "กรุณาระบุรายละเอียด",
              }}
              placeholder="ระบุรายละเอียด"
            />
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">อัพโหลดเอกสารแนบ Info</Typography>
            {previewImages.map((r: File, index: number) => (
              <Box key={r.name} sx={{ pt: 1 }}>
                <Cardfileupload
                  title={`${r.name} (${formatUtils.formatBytes(r.size)})`}
                  onClick={() => handleRemove(index)}
                />
              </Box>
            ))}

            <Box sx={{ mt: 1 }}>
              <ButtonUpload
                multiple
                control={control}
                name="files.files_attachments"
              />
            </Box>
          </Box>
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ButtonCustom
            type="button"
            title="ย้อนกลับ"
            background="white"
            hoverbg="#dfdfdf"
            onClick={handlePrevState}
          />
          <ButtonCustom type="submit" title="ถัดไป" />
        </div>
      </Paper>
    </Box>
  );
};

export default Formstatetwo;
