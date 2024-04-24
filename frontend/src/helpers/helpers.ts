export function bytesToMegaBytes(bytes: number) {
  let size = bytes / 1024 / 1024;
  return size.toFixed(2);
}

export function DateToDays(date: string) {
  let currentDate = new Date();
  let uploadDate = new Date(date);
  let diff = currentDate.getTime() - uploadDate.getTime();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
}