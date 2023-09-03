export const formatToCurrency = (
  value: number | null,
  currency: string,
  location = 'en-GB',
) => {
  const numberValue = !value || Number.isNaN(value) ? 0 : value;

  return new Intl.NumberFormat(location, {style: 'currency', currency}).format(
    numberValue,
  );
};

export const getRandomItemFromArray = (arr: string[]): string => {
  const randomItemIndex = Math.floor(Math.random() * arr.length);

  return arr[randomItemIndex];
};

export const slugify = (str: string): string => {
  return str.replace(' ', '-').toLowerCase();
};

export const capitalizeString = (str: string): string => {
  return `${str.charAt(0).toUpperCase()}${str.substring(1)}`;
};
