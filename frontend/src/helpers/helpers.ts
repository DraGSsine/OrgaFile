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
