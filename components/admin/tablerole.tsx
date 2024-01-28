import formatUtils from "@/app/utils/format";
import { IUserlist } from "@/types/user.type";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import React from "react";
import CustomizedSwitches from "../form/switchcustom";
import KebabMenu from "../kebab";
import CheckboxHook from "../form/Checkbox";

type Props = {
  control: any;
  isEdit: boolean;
};

const TableRole = (props: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "#000" }}>
          <TableRow>
            <TableCell
              sx={{ color: "white", padding: "0px 16px" }}
              align="left"
            >
              <CheckboxHook
                disabled={props.isEdit}
                name="manage_request"
                control={props.control}
                label=" จัดการข้อมูลนักวิจัย/คำร้อง"
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            </TableCell>
            <TableCell
              sx={{ color: "white", padding: "0px 16px" }}
              align="left"
            >
              <CheckboxHook
                disabled={props.isEdit}
                name="manage_admin"
                control={props.control}
                label="จัดการข้อมูลผู้ดูแลระบบ"
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">
              <CheckboxHook
                disabled={props.isEdit}
                name="role.add_researcher"
                control={props.control}
                label="เพิ่มข้อมูลนักวิจัย"
              />
            </TableCell>
            <TableCell align="left">
              <CheckboxHook
                disabled={props.isEdit}
                name="role.add_admin"
                control={props.control}
                label="เพิ่มข้อมูลผู้ดูแลระบบ"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">
              <CheckboxHook
                disabled={props.isEdit}
                name="role.edit_researcher"
                control={props.control}
                label="แก้ไขข้อมูลนักวิจัย"
              />
            </TableCell>
            <TableCell align="left">
              <CheckboxHook
                disabled={props.isEdit}
                name="role.edit_admin"
                control={props.control}
                label="แก้ไขข้อมูลผู้ดูแลระบบ"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">
              <CheckboxHook
                disabled={props.isEdit}
                name="role.delete_researcher"
                control={props.control}
                label="ลบข้อมูลนักวิจัย"
              />
            </TableCell>
            <TableCell align="left">
              <CheckboxHook
                disabled={props.isEdit}
                name="role.delete_admin"
                control={props.control}
                label="ลบข้อมูลผู้ดูแลระบบ"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">
              <CheckboxHook
                disabled={props.isEdit}
                name="role.reply_researcher"
                control={props.control}
                label="ตอบกลับให้คำปรึกษานักวิจัย"
              />
            </TableCell>
            <TableCell align="left">
              <CheckboxHook
                disabled={props.isEdit}
                name="role.edit_permission"
                control={props.control}
                label="แก้ไขสิทธิ์การเข้าถึง"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              <CheckboxHook
                disabled={props.isEdit}
                name="role.see_of_request"
                control={props.control}
                label="ดูรายการขอคำร้อง"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              <CheckboxHook
                disabled={props.isEdit}
                name="role.edit_of_request"
                control={props.control}
                label="แก้ไขสถานะรายการคำร้อง"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left" colSpan={2}>
              <CheckboxHook
                disabled={props.isEdit}
                name="role.delete_of_request"
                control={props.control}
                label="ลบรายการขอคำร้อง"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableRole;
