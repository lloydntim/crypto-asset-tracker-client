export const formatToCurrency = (
  value: number,
  currency: string,
  location = 'en-GB',
) => {
  const numberValue = !value || Number.isNaN(value) ? 0 : value;

  return new Intl.NumberFormat(location, {style: 'currency', currency}).format(
    numberValue,
  );
};
