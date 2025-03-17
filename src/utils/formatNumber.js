export const formatNumber = (number) => {
  return new Intl.NumberFormat('de-CH').format(number);
};
