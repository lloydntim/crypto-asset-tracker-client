import i18n from '../locales/i18n';

export const createSelectOptions = (
  arr: string[],
  tKeyPath: string,
): {text: string; value: string}[] => {
  return arr.map((type: string) => ({
    value: type,
    text: i18n.t(`${tKeyPath}.${type}`),
  }));
};
