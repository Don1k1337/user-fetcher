export function formatNumberBeforeSubmit(number: string) {
  let trimmedNumber = number.replace(/-/g, "");
  if (trimmedNumber.length > 6) trimmedNumber = trimmedNumber.substring(0, 6);
  return trimmedNumber;
}
