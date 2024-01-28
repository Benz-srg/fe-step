import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import formatUtils from "@/app/utils/format";
import { IProject } from "@/types/project.type";

type Props = { data: IProject[]; row_count: number };

const TableProject: React.FC<Props> = ({ data, row_count }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "#000" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }} align="center">
              ลำดับ
            </TableCell>
            <TableCell sx={{ color: "white" }} align="left">
              ชื่อสิ่งประดิษฐ์
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              ประเภทคำร้อง
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              ลักษณะสิ่งประดิษฐ์
            </TableCell>
            <TableCell sx={{ color: "white" }} align="center">
              สถานะคำร้อง
            </TableCell>
            <TableCell
              sx={{ color: "white", cursor: "pointer" }}
              align="center"
            >
              วันที่ยื่นคำร้อง
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: IProject, index: number) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {index + 1}
              </TableCell>
              <TableCell align="left">
                <Typography>{row.name_th}</Typography>
                <Typography>{row.name_en}</Typography>
              </TableCell>
              <TableCell align="center">{row.name_th}</TableCell>
              <TableCell align="center">{row.name_en}</TableCell>
              <TableCell align="center">
                <Typography
                  sx={{
                    bgcolor: "#f5eaff",
                    borderRadius: 4,
                    py: 1,
                    color: "#0066ff",
                  }}
                >
                  {formatUtils.formatRequestStatus(row.state)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                {formatUtils.formatDate(row.created_at)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableProject;
