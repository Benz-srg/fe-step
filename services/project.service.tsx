import axiosInstance from "@/app/utils/axios";

//localhost:3005/v1/preliminary-invention

const projectService = {
  list: (payloay?: any) => axiosInstance.get("v1/project", { params: payloay }),
  create: (payload?: any) => axiosInstance.post("v1/project", payload),
  createFiles: (payload?: any) => axiosInstance.post("v1/project", payload),
};

export default projectService;
