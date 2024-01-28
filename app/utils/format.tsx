import dayjs from "dayjs";

const formatUtils = {
  formatDate: (val: string) => {
    if (!val) return "";
    return dayjs(val).add(543, "year").format("DD-MM-YYYY");
  },
  formatRequestStatus: (key: number) => {
    switch (key) {
      case 1:
        return "อยู่ระหว่างดำเนินการ";

      case 2:
        return "อยู่ระหว่างดำเนินการ";

      case 3:
        return "อยู่ระหว่างดำเนินการ";

      default:
        return "";
    }
  },
  formatBytes: (bytes: number, decimals = 2): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  },
  numberFormat(val: any, digit?: number) {
    console.log('val : ',val)
    if (!val) return;
    let digitsOnly = val;
    if (digit) {
      const pureNumber = val.replace(/(?!-)[^0-9.]/g, '');
      digitsOnly =
        pureNumber.indexOf('.') >= 0
          ? pureNumber.substr(0, pureNumber.indexOf('.')) + pureNumber.substr(pureNumber.indexOf('.'), digit + 1)
          : pureNumber;
    } else digitsOnly = val.replace(/\D/g, '');
    return digitsOnly;
  },
};

export default formatUtils;
