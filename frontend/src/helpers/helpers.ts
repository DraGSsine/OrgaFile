import { ColorScheme } from "@/types/types";

export function bytesToMegaBytes(bytes: number) {
  let size = bytes / 1024 / 1024;

  if (size < 1) {
    return size.toFixed(2) + " KB";
  } else if (size < 1024) {
    return size.toFixed(2) + " MB";
  } else {
    return (size / 1024).toFixed(2) + " GB";
  }
}

export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

export const getColorBaseOnFormat = (format: string): ColorScheme => {
  const colors: Record<string, ColorScheme> = {
    pdf: {
      barColor: "bg-danger-500",
      backGroundColor: "bg-danger-50",
    },
    docx: {
      barColor: "bg-primary-500",
      backGroundColor: "bg-primary-50",
    },
    txt: {
      barColor: "bg-default-500",
      backGroundColor: "bg-default-100",
    },
    xlsx: {
      barColor: "bg-success-500",
      backGroundColor: "bg-success-50",
    },
    default: {
      barColor: "bg-default-500",
      backGroundColor: "bg-default-100",
    },
  };

  return colors[format.toLowerCase()] || colors.default;
};

export function FormatTheDate(date: Date) {
  const d = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());

  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));

  if (diffSeconds < 60) {
    return "Just now";
  } else if (diffMinutes < 60) {
    return diffMinutes + " minute" + (diffMinutes === 1 ? "" : "s") + " ago";
  } else if (diffHours < 24) {
    return diffHours + " hour" + (diffHours === 1 ? "" : "s") + " ago";
  } else if (diffDays < 7) {
    return diffDays + " day" + (diffDays === 1 ? "" : "s") + " ago";
  } else if (diffWeeks < 4) {
    return diffWeeks + " week" + (diffWeeks === 1 ? "" : "s") + " ago";
  } else if (diffMonths < 12) {
    return diffMonths + " month" + (diffMonths === 1 ? "" : "s") + " ago";
  } else {
    return diffYears + " year" + (diffYears === 1 ? "" : "s") + " ago";
  }
}

export function getFileImage(format: string): string {
  const excelFormats = [
    "xls",
    "xlsx",
    "xlsm",
    "xlsb",
    "xltx",
    "xltm",
    "xlam",
    "xll",
    "xlw",
    "xlr",
    "ods",
    "fods",
    "uos",
    "sxc",
    "dif",
    "dbf",
    "slk",
    "pxl",
    "wb2",
    "123",
    "wq1",
    "wks",
    "wk1",
    "wk3",
    "wk4",
  ];
  const wordFormats = [
    "doc",
    "docx",
    "docm",
    "dot",
    "dotx",
    "dotm",
    "docb",
    "odt",
    "fodt",
    "ott",
    "uot",
    "txt",
    "wps",
    "wpt",
    "wpd",
    "sxw",
    "stw",
    "sxg",
    "sgl",
    "vor",
    "uof",
    "uot",
    "xml",
    "xps",
    "epub",
    "mobi",
    "fb2",
    "lit",
    "lrf",
    "azw",
    "azw3",
    "azw4",
    "prc",
    "pdb",
    "oxps",
    "pml",
    "snb",
    "tcr",
    "rb",
    "ps",
    "djvu",
    "djv",
    "indd",
    "p65",
    "pmd",
    "pmdx",
    "pm6",
    "pm5",
    "pm4",
    "pm3",
    "pm2",
    "pmt",
    "pmt5",
    "pmt6",
    "p65",
    "pp65",
    "ppf",
    "pp4",
    "pp3",
    "pp2",
    "pp",
  ];
  const pdfFormats = ["pdf"];
  const powerpointFormats = [
    "ppt",
    "pptx",
    "pptm",
    "pot",
    "potx",
    "potm",
    "pps",
    "ppsx",
    "ppsm",
    "ppa",
    "ppam",
    "ppj",
    "key",
    "odp",
    "fodp",
    "otp",
    "sxi",
    "sti",
  ];
  const textFormats = ["txt", "text", "md"];

  switch (true) {
    case textFormats.includes(format):
      return "/formatImages/txt.png";
    case excelFormats.includes(format):
      return "/formatImages/xlsx.png";
    case wordFormats.includes(format):
      return "/formatImages/docx.png";
    case pdfFormats.includes(format):
      return "/formatImages/pdf.png";
    case powerpointFormats.includes(format):
      return "/formatImages/powerpoint.png";
    default:
      return "/formatImages/file.png";
  }
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

// export function formatDateForInvoice(date: string) {
//   // merch 3 2022
//   const d = new Date(date);
//   const month = d.toLocaleString("default", { month: "short" });
//   const day = d.getDate();
//   const year = d.getFullYear();
//   return `${month} ${day} ${year}`;
// }


export function formatDateForInvoice(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}