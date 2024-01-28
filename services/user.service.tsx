import axiosInstance from "@/app/utils/axios";

const userService = {
  profile: () => axiosInstance.get("v1/user"),
  create: (payload?: any) => axiosInstance.post("v1/user", payload),
  list: (payload?: any) =>
    axiosInstance.get("v1/user/list", { params: payload }),
};

export default userService;
