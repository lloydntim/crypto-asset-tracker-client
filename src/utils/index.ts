export const formatToCurrency = (
  value: number,
  currency: string,
  location = 'en-GB',
) =>
  new Intl.NumberFormat(location, {style: 'currency', currency}).format(value);
