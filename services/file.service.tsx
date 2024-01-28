import axiosInstance from "@/app/utils/axios";

//localhost:3005/v1/preliminary-invention

const fileService = {
  createFiles: (project_id: number, payload?: any) =>
    axiosInstance.post(`v1/file/upload/project/${project_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 10000,
    }),

  uploadImgProfile: (user_id: string, payload?: any) =>
    axiosInstance.post(`v1/file/upload/profile/${user_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 10000,
    }),
};

export default fileService;
