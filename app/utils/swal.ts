import Swal from "sweetalert2";

export const msgSuccess = (message: string) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: message,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const msgError = (message: string) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: "",
    text: message || "เกิดข้อผิดพลาดบางประการ",
    showConfirmButton: false,
    timer: 2000,
  });
};
