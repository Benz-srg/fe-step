import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import formatUtils from "@/app/utils/format";
import { IUserlist } from "@/types/user.type";
import CustomizedSwitches from "../form/switchcustom";
import KebabMenu from "../kebab";
import { useRouter } from "next/navigation";
import { IAdmin } from "@/types/admin.type";

type Props = {
  data: IAdmin[];
  onActions: (key: string, data: any, is_active?: boolean) => void;
};

const TableUser: React.FC<Props> = ({ data, onActions }) => {
  const router = useRouter();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ bgcolor: "#000" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }} align="center">
              ลำดับ
            </TableCell>
            <TableCell sx={{ color: "white" }} align="left">
              ชื่ออาจารย์/นักวิจัย
            </TableCell>
            <TableCell sx={{ color: "white" }} align="left">
              ช่องทางติดต่อ
            </TableCell>
            <TableCell sx={{ color: "white" }} align="left">
              ที่ทำงาน
            </TableCell>
            {/* <TableCell sx={{ color: "white" }} align="left">
              ผู้ประสานงาน
            </TableCell> */}
            <TableCell
              sx={{ color: "white", cursor: "pointer" }}
              align="center"
            >
              วันที่สร้าง
            </TableCell>
            <TableCell
              sx={{ color: "white", cursor: "pointer", width: "auto" }}
              align="center"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: IAdmin, index: number) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {index + 1}
              </TableCell>
              <TableCell align="left">
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  onClick={() => router.push(`admin/${row.id}`)}
                >
                  <Box sx={{ pr: 1 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        row.img_profile
                          ? `${process.env.NEXT_PUBLIC_BASE_URL}/images/${row.img_profile}`
                          : "https://mui.com/static/images/avatar/1.jpg"
                      }
                      sx={{ width: 42, height: 42 }}
                    />
                  </Box>
                  <Box>
                    <Typography>{row.full_name}</Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="left">
                <Typography>{row.phone}</Typography>
                <Typography>{row.email}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{row.department}</Typography>
                <Typography>{row.faculty}</Typography>
              </TableCell>
              {/* <TableCell align="left">
                <div>
                  <Typography>{row.user_assisant?.full_name}</Typography>
                  <Typography>{row.user_assisant?.phone}</Typography>
                  <Typography>{row.user_assisant?.email}</Typography>
                </div>
              </TableCell> */}
              <TableCell align="center">
                {formatUtils.formatDate(row.created_at)}
              </TableCell>
              <TableCell align="left">
                <Box sx={{ display: "flex" }}>
                  <CustomizedSwitches
                    checked={row.is_active}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>,
                      chekced: boolean
                    ) => onActions("suspended", row.id, chekced)}
                  />
                  <KebabMenu
                    menu={[
                      {
                        title: "แก้ไข",
                        action: () => onActions("edit", row.id),
                      },
                      {
                        title: "ลบ",
                        action: () => onActions("delete", row.id),
                      },
                    ]}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableUser;
