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
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IFormProject } from "@/types/project.type";
import Input from "@/components/form/Input";
import Cardfileupload from "@/components/form/cardfileupload";
import { useForm } from "react-hook-form";
import ButtonCustom from "@/components/form/ButtonCustom";
import CheckboxHook from "@/components/form/Checkbox";
import InputArea from "@/components/form/InputArea";
import dayjs from "dayjs";

type Props = {
  form: IFormProject;
  handleNextState: (data: any, state: number) => void;
  state: number;
  handlePrevState: (state: number) => void;
};

const Formstatethree = ({ form, handleNextState, handlePrevState }: Props) => {
  const { control, handleSubmit } = useForm<IFormProject>({
    defaultValues: {
      funding_information: {
        not_received: form.funding_information?.not_received,
        received: form.funding_information?.received,
        received_from: form.funding_information?.received_from,
        according_no: form.funding_information?.according_no,
        results: form.funding_information?.results,
      },
      publication_infomation: {
        never_published: form.publication_infomation?.never_published,
        ever_published: form.publication_infomation?.ever_published,
        date_published: form.publication_infomation?.date_published,
      },
      show_invention: {
        is_show: form.show_invention?.is_show,
        title: form.show_invention?.title,
        show_event_title: form.show_invention?.show_event_title,
        show_date: form.show_invention?.show_date,
      },
      award_information: {
        is_received: form.award_information?.is_received,
        title: form.award_information?.title,
        department: form.award_information?.department,
        reveived_date: form.award_information?.reveived_date,
      },
    },
  });

  const handleOnSubmit = (data: any) => handleNextState(data, 3);

  return (
    <div>
      <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
        <Paper sx={{ p: 3 }} elevation={0}>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid red",
                    py: 1.5,
                    px: 3,
                    borderRadius: 2,
                    bgcolor: "#fdebec",
                    color: "red",
                  }}
                >
                  <Typography variant="body2">
                    info ส่วนี้เพื่อความสะดวกในการบริหารสิทธิความเป็นเจ้าของ
                    ซึ่งหากเห็นว่าละเอียดเกินไปในขั้นตอนเบื้องต้นนี้
                    อาจจำไปใส่เป็นข้อมูลที่ต้องกรอกในขั้นตอนการสืบค้นเชิงลึก
                  </Typography>
                </Box>
              </Grid>
              {/* tag 1 */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2">
                    1.การได้รับทุนสนับสนุนในงานวิจัย
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <CheckboxHook
                    name="funding_information.not_received"
                    control={control}
                    label="ไม่ได้รับ"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ width: "auto" }}>
                    <CheckboxHook
                      name="funding_information.received"
                      control={control}
                      label="ได้รับจาก"
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Input
                      name="funding_information.received_from"
                      id="funding_information.received_from"
                      control={control}
                      rules={{
                        required: "ระบุ",
                      }}
                      placeholder="ระบุ"
                    />
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                  <Typography sx={{ pl: 3.5, pr: 2 }} variant="body2">
                    ตามสัญญาเลขที่
                  </Typography>
                  <Box sx={{ flexGrow: 1, pr: 2 }}>
                    <Input
                      control={control}
                      name="funding_information.according_no"
                      id="funding_information.according_no"
                      rules={{
                        required: "ระบุเลขที่สัญญา",
                      }}
                      placeholder="ระบุเลขที่สัญญา"
                    />
                  </Box>
                  <Typography variant="body2">
                    (ขอความกรุณาแบบสำเนาสัญญา)
                  </Typography>
                </Box>
                <Box>
                  <Box sx={{ mb: 1, pl: 3.5 }}>
                    <ButtonUpload control={control} name="test" />
                  </Box>
                </Box>
                <Box sx={{ mb: 1, pl: 3.5 }}>
                  <Typography variant="body2">
                    ผลการวิจัย/ขั้นตอนการประดิษฐ์ที่เกิดขึ้นจากการรับทุนนี้
                  </Typography>
                  <InputArea
                    name="funding_information.results"
                    id="funding_information.results"
                    control={control}
                    rules={{
                      required: "กรุณาระบุรายละเอียด",
                    }}
                    placeholder="ระบุรายละเอียด"
                  />
                </Box>
              </Grid>
              {/* tag2 */}
              <Grid item xs={12}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="body1">
                    2.การตีพิมพ์ หรือการเผยแพร่ผลงาน
                    หรือการจัดแสดงการประดิษฐ์หรือการรับรางวัลจากการประดิษฐ์ในช่วงเวลาก่อนหน้า
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <CheckboxHook
                    name="publication_infomation.never_published"
                    control={control}
                    label="ไม่มีการตีพิมพ์ หรือการเผยแผร่ผลงาน หรือจัดการแสดงการประดิษฐ์ในช่วงเวลาก่อนหน้า"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <CheckboxHook
                    name="publication_infomation.ever_published"
                    control={control}
                    label="เคยตีพิมพ์ หรือเผยแพร่ผลงาน"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 1, pl: 3.5 }}>
                  <Cardfileupload
                    title={"CRM document and project plan.pdf (200 KB)"}
                  />
                </Box>
                <Box sx={{ mb: 1, pl: 3.5 }}>
                  <Cardfileupload
                    title={"CRM document and project plan.pdf (200 KB)"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 1, pl: 3.5 }}>
                  <ButtonUpload control={control} name="test" />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ mb: 1, pl: 3.5, display: "flex", alignItems: "center" }}
                >
                  <Typography variant="body2" sx={{ pr: 2 }}>
                    วันเดือนปีที่ตีพิมพ์ หรือเผยแพร่
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Input
                      control={control}
                      name="publication_infomation.date_published"
                      id="publication_infomation.date_published"
                      placeholder="ระบุวันเดือนปี"
                    />
                  </Box>
                </Box>
              </Grid>
              {/* เคยจัดแสดงการประดิษฐ์ในช่วงเวลาก่อนหน้า */}
              <Grid item xs={12}>
                <Box>
                  <CheckboxHook
                    name="show_invention.is_show"
                    control={control}
                    label="เคยจัดการแสดงการประดิษฐ์ในช่วงเวลาก่อนหน้า"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ mb: 1, pl: 3.5, display: "flex", alignItems: "center" }}
                >
                  <Typography variant="body2" sx={{ pr: 2 }}>
                    ชื่อเรื่อง
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Input
                      control={control}
                      name="show_invention.title"
                      id="show_invention.title"
                      // rules={{
                      //   required: "กรุณาระบุโทรศัพท์เคลื่อนที่",
                      // }}
                      placeholder="ชื่อเรื่อง"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ mb: 1, pl: 3.5, display: "flex", alignItems: "center" }}
                >
                  <Typography variant="body2" sx={{ pr: 2 }}>
                    หน่วยงานที่ให้รางวัล
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Input
                      control={control}
                      name="show_invention.show_event_title"
                      id="show_invention.show_event_title"
                      // rules={{
                      //   required: "กรุณาระบุโทรศัพท์เคลื่อนที่",
                      // }}
                      placeholder="ระบุหน่วยงานให้รางวัล"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ mb: 1, pl: 3.5, display: "flex", alignItems: "center" }}
                >
                  <Typography variant="body2" sx={{ pr: 2 }}>
                    วันเดือนปีที่รับรางวัล
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Input
                      control={control}
                      name="show_invention.show_date"
                      id="show_invention.show_date"
                      // rules={{
                      //   required: "กรุณาระบุโทรศัพท์เคลื่อนที่",
                      // }}
                      placeholder="ระบุวันเดือนปี"
                    />
                  </Box>
                </Box>
              </Grid>
              {/* เคยได้รับรางวัลการประดิษฐ์ */}
              <Grid item xs={12}>
                <Box>
                  <CheckboxHook
                    name="award_information.is_received"
                    control={control}
                    label="เคยได้รับรางวัลการประดิษฐ์"
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ mb: 1, pl: 3.5, display: "flex", alignItems: "center" }}
                >
                  <Typography variant="body2" sx={{ pr: 2 }}>
                    ชื่อเรื่อง
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Input
                      control={control}
                      name="show_invention.title"
                      id="show_invention.title"
                      // rules={{
                      //   required: "กรุณาระบุโทรศัพท์เคลื่อนที่",
                      // }}
                      placeholder="ชื่อเรื่อง"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ mb: 1, pl: 3.5, display: "flex", alignItems: "center" }}
                >
                  <Typography variant="body2" sx={{ pr: 2 }}>
                    หน่วยงานที่ให้รางวัล
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Input
                      control={control}
                      name="show_invention.show_event_title"
                      id="show_invention.show_event_title"
                      // rules={{
                      //   required: "กรุณาระบุโทรศัพท์เคลื่อนที่",
                      // }}
                      placeholder="ระบุหน่วยงานให้รางวัล"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{ mb: 1, pl: 3.5, display: "flex", alignItems: "center" }}
                >
                  <Typography variant="body2" sx={{ pr: 2 }}>
                    วันเดือนปีที่รับรางวัล
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Input
                      control={control}
                      name="show_invention.show_date"
                      id="show_invention.show_date"
                      // rules={{
                      //   required: "กรุณาระบุโทรศัพท์เคลื่อนที่",
                      // }}
                      placeholder="ระบุวันเดือนปี"
                    />
                  </Box>
                </Box>
              </Grid>
              {/* end tag2 */}
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
            <ButtonCustom type="submit" title="ส่งข้อมูล" />
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default Formstatethree;
