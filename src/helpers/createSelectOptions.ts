import {t} from 'i18next';

export const createSelectOptions = (
  arr: string[],
  tKeyPath: string,
): {text: string; value: string}[] => {
  return arr.map((type: string) => ({
    value: type,
    text: t(`${tKeyPath}.${type}`),
  }));
};
