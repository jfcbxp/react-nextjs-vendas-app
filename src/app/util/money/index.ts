export const conveterEmBigDecimal = (value: string): number => {
  if (!value) {
    return 0;
  }
  return parseFloat(value.replace(".", "").replace(",", "."));
};