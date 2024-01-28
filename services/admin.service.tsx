import axiosInstance from "@/app/utils/axios";
import { IPayloadAdmin, IPayloadChangePassword } from "@/types/admin.type";

const adminService = {
  profile: () => axiosInstance.get("v1/admin/profile"),
  findOne: (user_id: string) => axiosInstance.get("v1/admin/" + user_id),
  list: (query?: any) => axiosInstance.get("v1/admin", { params: query }),
  create: (payload?: any) => axiosInstance.post("v1/admin", payload),
  update: (user_id: string, payload?: IPayloadAdmin) =>
    axiosInstance.patch("v1/admin/" + user_id, payload),
  changepassword: (user_id: string, payload: IPayloadChangePassword) =>
    axiosInstance.patch(`v1/admin/${user_id}/changepassword`, payload),
  delete: (user_id: string) => axiosInstance.delete("v1/admin/" + user_id),
  suspended: (user_id: string) =>
    axiosInstance.delete(`v1/admin/${user_id}/suspended`),
};

export default adminService;
