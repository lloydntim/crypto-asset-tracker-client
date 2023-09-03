import {InputProps} from '../../../components/Input/InputHelper';
import {createSelectOptions} from '../../../helpers/createSelectOptions';

enum Currencies {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
}

export type Currency = `${Currencies}`;

export type CurrencyOption = {
  text: Currencies;
  value: Currencies;
};

export type CoinSymbol = {
  id: string;
  name: string;
};

export enum NewCoinOptions {
  PRESET = 'preset',
  OTHER = 'other',
}

export type HoldingStorageType = `${HoldingStorageTypes}`;

export interface Holding {
  id: string;
  slug?: string;
  name: string;
  type?: HoldingStorageType;
  amount: number;
  value: number;
  holdingId?: string;
  currency?: string;
  ownerId?: string;
}

export interface CoinItem {
  id: string;
  symbol: string;
  holdings: Holding[];
  name: string;
  creatorId: string;
  coinId: string;
}

enum HoldingStorageTypes {
  WALLET = 'wallet',
  EXCHANGE = 'exchange',
  STAKING = 'staking',
}

export interface HoldingStorage {
  type: HoldingStorageType;
  total: number;
  holdings: Holding[];
}

export interface Coin {
  id: string;
  coinId: string;
  name: string;
  symbol: string;
  price: number;
  amount: number;
  total: number;
  value: number;
  creatorId: string;
  holdingStorages: HoldingStorage[];
}

export const HOLDING_TYPES_T_KEY_PATH =
  'portfolio:coinlist.input.options.holdingTypes';
const ADD_COIN_OPTIONS_T_KEY_PATH = 'portfolio:coinlist.input.options.newCoin';
const REMOVE_COIN_DIALOG_T_KEY_PATH = 'portfolio:coinlist.dialog.removeCoin';
const REMOVE_HOLDING_DIALOG_T_KEY_PATH = 'portfolio:coinlist.dialog.removeCoin';

export const currencies = Object.values(Currencies);
export const holdingTypes = Object.values(HoldingStorageTypes);
export const addNewCoinOptions = Object.values(NewCoinOptions);

export const coinSelectOptions = createSelectOptions(
  addNewCoinOptions,
  ADD_COIN_OPTIONS_T_KEY_PATH,
);

export const coinListDialogMapper: {
  [key: string]: {titleTKey: string; messageTKey: string; callback: string};
} = {
  removeCoin: {
    titleTKey: `${REMOVE_COIN_DIALOG_T_KEY_PATH}.title`,
    messageTKey: `${REMOVE_COIN_DIALOG_T_KEY_PATH}.message`,
    callback: 'onRemoveCoin',
  },
  removeCoinHolding: {
    titleTKey: `${REMOVE_HOLDING_DIALOG_T_KEY_PATH}.title`,
    messageTKey: `${REMOVE_HOLDING_DIALOG_T_KEY_PATH}.message`,
    callback: 'onRemoveCoinHolding',
  },
};

export const coinListInputValidationMapper: {
  [key: string]: InputProps;
} = {
  name: {
    pattern: /^[a-zA-Z ]+$/,
    minLength: 3,
    maxLength: 20,
    patternErrorMessageTKey:
      'portfolio:coinlist.form.addHolding.message.error.patternName',
  },
  amount: {
    pattern: /^[0-9.,/]+$/,
    minLength: 1,
    maxLength: 12,
    patternErrorMessageTKey:
      'portfolio:coinlist.form.addHolding.message.error.patternAmount',
  },
};

export const currenciesOptions = currencies.map((currency) => ({
  text: currency,
  value: currency,
}));

export const types = createSelectOptions(
  holdingTypes,
  HOLDING_TYPES_T_KEY_PATH,
);

export const currencyFormatMapper: {
  [key: string]: {currency: Currencies; location: string};
} = {
  USD: {currency: Currencies.USD, location: 'en-US'},
  GBP: {currency: Currencies.GBP, location: 'en-GB'},
  EUR: {currency: Currencies.USD, location: 'de-DE'},
};

export const formatAmount = (value: number = 0, location: string) => {
  const v = typeof value === 'string' ? parseFloat(value) : value;
  if (!v) {
    return v.toFixed(2);
  }
  return v < 1
    ? v.toFixed(4)
    : new Intl.NumberFormat(location, {minimumFractionDigits: 2}).format(v);
};
