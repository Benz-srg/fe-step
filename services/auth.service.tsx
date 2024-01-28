import axiosInstance from "@/app/utils/axios";

type TChangepassword = {
  kid: string;
  password: string;
};
type TMail = {
    email: string;
  };
const authService = {
  forget: (payload: TMail) => axiosInstance.post("v1/auth/forget", payload),
  changepassword: (payload: TChangepassword) =>
    axiosInstance.patch("v1/auth/changepassword", payload),
};

export default authService;
