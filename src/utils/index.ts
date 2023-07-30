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

export const getRandomItemFromArray = (arr: string[]): string => {
  const randomItemIndex = Math.floor(Math.random() * arr.length);

  return arr[randomItemIndex];
};

export const slugify = (str: string) => {
  return str.replace(' ', '-').toLowerCase();
};
