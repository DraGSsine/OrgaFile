export function convertToGb(bytesSize: number): number {
  if (bytesSize < 0 || isNaN(bytesSize)) {
    return 0;
  }

  const gbSize = bytesSize / 1024 ** 3;

  if (gbSize === 0) {
    return 0;
  }
  if (Number.isInteger(gbSize)) {
    return parseFloat(gbSize.toFixed(2));
  }

  return parseFloat(gbSize.toFixed(2));
}
