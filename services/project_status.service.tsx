import axiosInstance from "@/app/utils/axios";
import { IPayloadAdmin, IPayloadChangePassword } from "@/types/admin.type";

const projectStatusService = {
  list: (query?: any) =>
    axiosInstance.get("v1/project-status", { params: query }),
};

export default projectStatusService;

// [
//   {
//     key: 1,
//     value: "รับเรื่อง",
//   },
//   {
//     key: 2,
//     value: "ตรวจสอบเอกสาร",
//   },
//   {
//     key: 3,
//     value: "อยู่ระหว่างดำเนินการ",
//   },
//   {
//     key: 4,
//     value: "สำเร็จ",
//   },
// ]
