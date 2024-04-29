export function bytesToMegaBytes(bytes: number) {
  let size = bytes / 1024 / 1024;
  
  if (size < 1) {
    return size.toFixed(2) + " KB";
  }
  else if (size < 1024) {
    return size.toFixed(2) + " MB";
  }
  else {
    return (size / 1024).toFixed(2) + " GB";
  }
}

export function FormatTheDate(date: string) {
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



export function getFileImage(format: string) : string
{
  const audioFormats = ["mp3", "wav", "flac", "aac", "ogg", "wma", "m4a", "aiff", "alac", "dsd", "pcm", "mp2", "mp1", "mka", "m3u", "m3u8", "pls", "cda", "mid", "midi", "kar", "rmi", "m4p", "m4b", "m4r", "m4v", "3ga", "aa", "aax", "act", "amr", "ape", "au", "awb", "dct", "dss", "dvf", "gsm", "iklax", "ivs", "mmf", "mpc", "msv", "nmf", "nsf", "opus", "ra", "rm", "raw", "rf64", "sln", "tta", "voc", "vox", "wv", "webm", "8svx"];
  const videoFormats = ["mp4", "mkv", "webm", "flv", "avi", "mov", "wmv", "mpg", "mpeg", "3gp", "3g2", "m4v", "f4v", "f4p", "f4a", "f4b", "ogv", "swf", "vob", "m2v", "asf", "rm", "rmvb", "divx", "ts", "m2ts", "mts", "mxf", "ogm", "mod", "tod", "dat", "vro", "dvr-ms", "m1v", "m2p", "m2t", "mp2v", "evo", "ogx", "qt", "yuv", "cine", "rgb", "vc1", "vfw", "dts", "dts-hd", "eac3", "mlp", "truehd", "thd", "atrac", "atrac3", "at3", "at3p", "dolby", "dolby-truehd", "dolby-ac3", "dolby-ac3-eac3", "dolby-ac3-truehd", "dolby-ac3-atmos", "dolby-ac3-truehd-atmos", "dolby-ac3-truehd-atmos-dts", "dolby-ac3-truehd-atmos-dts-x", "dolby-ac3-truehd-atmos-dts-x-dts", "dolby-ac3-truehd-atmos-dts-x-dts-hd", "dolby-ac3-truehd-atmos-dts-x-dts-hd-dts", "dolby-ac3-truehd-atmos-dts-x-dts-hd-dts-x", "dolby-ac3-truehd-atmos-dts-x-dts-hd-dts-x-dts", "dolby-ac3-truehd-atmos-dts-x-dts-hd-dts-x-dts-hd", "dolby-ac3-truehd-atmos-dts-x-dts-hd-dts-x-dts-hd-dts", "dolby-ac3-truehd-atmos-dts-x"];
  const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "ico", "tiff", "psd", "raw", "heif", "indd", "ai", "eps"];
  const archiveFormats = ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "iso", "dmg", "pkg", "deb", "rpm", "msi", "cab", "arj", "lzh", "z", "ace", "uue", "jar", "war", "ear", "sar", "par", "wsz", "wim", "swm", "wmz", "wz", "zoo", "rev"];
  const excelFormats = ["xls", "xlsx", "xlsm", "xlsb", "xltx", "xltm", "xlam", "xll", "xlw", "xlr", "ods", "fods", "uos", "sxc", "dif", "dbf", "slk", "pxl", "wb2", "123", "wq1", "wks", "wk1", "wk3", "wk4"];
  const wordFormats = ["doc", "docx", "docm", "dot", "dotx", "dotm", "docb", "odt", "fodt", "ott", "uot", "txt", "rtf", "wps", "wpt", "wpd", "sxw", "stw", "sxg", "sgl", "vor", "uof", "uot", "xml", "xps", "epub", "mobi", "fb2", "lit", "lrf", "azw", "azw3", "azw4", "prc", "pdb", "oxps", "pml", "snb", "tcr", "rb", "ps", "djvu", "djv", "indd", "p65", "pmd", "pmdx", "pm6", "pm5", "pm4", "pm3", "pm2", "pmt", "pmt5", "pmt6", "p65", "pp65", "ppf", "pp4", "pp3", "pp2", "pp"];
  const pdfFormats = ["pdf"];
  const powerpointFormats = ["ppt", "pptx", "pptm", "pot", "potx", "potm", "pps", "ppsx", "ppsm", "ppa", "ppam", "ppj", "key", "odp", "fodp", "otp", "sxi", "sti"];
  const photoshopFormats = ["psd"];
  const illustratorFormats = ["ai", "eps"];
  const textFormats = ["txt", "text", "md"];

  switch (true) {
    case textFormats.includes(format):
      return "/formatImages/txt.png";
    case audioFormats.includes(format):
      return "/formatImages/audio.png";
    case videoFormats.includes(format):
      return "/formatImages/video.png";
    case imageFormats.includes(format):
      return "/formatImages/image.png";
    case archiveFormats.includes(format):
      return "/formatImages/archive.png";
    case excelFormats.includes(format):
      return "/formatImages/excel.png";
    case wordFormats.includes(format):
      return "/formatImages/word.png";
    case pdfFormats.includes(format):
      return "/formatImages/pdf.png";
    case powerpointFormats.includes(format):
      return "/formatImages/powerpoint.png";
    case photoshopFormats.includes(format):
      return "/formatImages/photoshop.png";
    case illustratorFormats.includes(format):
      return "/formatImages/illustrator.png";
    default:
      return "/formatImages/file.png";
  }
}