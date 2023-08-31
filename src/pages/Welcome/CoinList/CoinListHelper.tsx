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

export enum AddNewCoinOptions {
  PRESET = 'preset',
  OTHER = 'other',
}

export type StorageOptionType = `${StorageOptionTypes}`;

export interface Holding {
  id: string;
  slug?: string;
  name: string;
  type: StorageOptionType;
  amount: number;
  value: number;
  holdingId?: string;
  currency?: string;
  ownerId?: string;
}

export interface Coin {
  id: string;
  symbol: string;
  holdings: Holding[];
  name: string;
  creatorId: string;
  coinId: string;
}

enum StorageOptionTypes {
  WALLET = 'wallet',
  EXCHANGE = 'exchange',
  STAKING = 'staking',
}

export interface StorageOption {
  type: StorageOptionType;
  total: number;
  holdings: Holding[];
}

export interface CoinListItem {
  id: string;
  coinId: string;
  name: string;
  symbol: string;
  price: number;
  amount: number;
  total: number;
  value: number;
  storageOptions: StorageOption[];
}

interface CoinList {
  balance: number;
  coins: CoinListItem[];
}
export interface CoinListProps {
  data: CoinList;
  onChange?: () => void;
  onAddCoin: (args: {symbol?: string; slug?: string}) => void;
  onRemoveCoin: (id: string) => void;
  onAddCoinHolding: (
    id: string,
    holding: {
      name: string;
      amount: number;
      type: StorageOptionType;
    },
  ) => void;
  onUpdateCoinHolding: (
    holdingId: string,
    {amount, name, type}: {amount?: number; name?: string; type?: string},
  ) => void;
  onRemoveCoinHolding: (holdingId: string) => void;
  onToggleEditMode: (args: boolean) => void;
  onChangeCurrency: (value: string) => void;
  selectedCoin: number | undefined;
  setSelectedCoin: (item: number) => void;
  editMode: boolean;
  convert: Currency;
  symbols: {name: string; id: string}[];
}

export const HOLDING_TYPES_T_KEY_PATH =
  'welcome:coinlist.input.options.holdingTypes';
const ADD_COIN_OPTIONS_T_KEY_PATH = 'welcome:coinlist.input.options.newCoin';
const REMOVE_COIN_DIALOG_T_KEY_PATH = 'welcome:coinlist.dialog.removeCoin';
const REMOVE_HOLDING_DIALOG_T_KEY_PATH = 'welcome:coinlist.dialog.removeCoin';

export const currencies = Object.values(Currencies);
export const holdingTypes = Object.values(StorageOptionTypes);
export const addNewCoinOptions = Object.values(AddNewCoinOptions);

export const newCoinSelectOptions = createSelectOptions(
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
