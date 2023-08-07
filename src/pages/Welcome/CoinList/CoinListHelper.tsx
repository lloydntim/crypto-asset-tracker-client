import {t} from 'i18next';
import {createSelectOptions} from '../../../helpers/createSelectOptions';

enum HoldingTypes {
  WALLET = 'wallet',
  EXCHANGE = 'exchange',
  STAKING = 'staking',
}

enum Currencies {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
}

enum AddNewCoinOptions {
  PRESET = 'preset',
  OTHER = 'other',
}

type HoldingType = HoldingTypes;

type Currency = Currencies;

interface HoldingsData {
  id: string;
  name: string;
  type: HoldingType;
  amount: number;
}

interface StorageTypeData {
  staking: HoldingsData[];
  wallet: HoldingsData[];
  exchange: HoldingsData[];
}

const HOLDING_TYPES_T_KEY_PATH = 'welcome:coinlist.input.options.holdingTypes';
const ADD_COIN_OPTIONS_T_KEY_PATH = 'welcome:coinlist.input.options.newCoin';
const REMOVE_COIN_DIALOG_T_KEY_PATH = 'welcome:coinlist.dialog.removeCoin';
const REMOVE_HOLDING_DIALOG_T_KEY_PATH = 'welcome:coinlist.dialog.removeCoin';
export interface AssetData {
  amount: number;
  value: number;
  storageTypes: StorageTypeData;
}
export interface CoinData {
  id: string;
  coinId: string;
  name: string;
  symbol: string;
  price: number;
  value: number;
  amount: number;
  holdings?: HoldingsData[];
  assets: AssetData;
}

export interface HoldingsListData {
  name: HoldingType;
  total: number;
  holdings: HoldingsData[];
}

export interface CoinListProps {
  data: {coins: CoinData[]};
  onChange: () => void;
  onAddCoin: (args: {symbol?: string; slug?: string}) => void;
  onRemoveCoin: (id: string) => void;
  onAddCoinHolding: (
    id: string,
    holding: {
      name: string;
      amount: number;
      type: string;
      currency: string;
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
  convert: string;
  symbols: {name: string; id: string}[];
}

export const currencies = Object.values(Currencies);
export const holdingTypes = Object.values(HoldingTypes);
export const addNewCoinOptions = Object.values(AddNewCoinOptions);

export const newCoinSelectOptions = createSelectOptions(
  addNewCoinOptions,
  ADD_COIN_OPTIONS_T_KEY_PATH,
);

export const coinListDialogMapper: {
  [key: string]: {title: string; message: string; callback: string};
} = {
  removeCoin: {
    title: t(`${REMOVE_COIN_DIALOG_T_KEY_PATH}.title`),
    message: t(`${REMOVE_COIN_DIALOG_T_KEY_PATH}.message`),
    callback: 'onRemoveCoin',
  },
  removeCoinHolding: {
    title: t(`${REMOVE_HOLDING_DIALOG_T_KEY_PATH}.title`),
    message: t(`${REMOVE_HOLDING_DIALOG_T_KEY_PATH}.message`),
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

/* eslint-disable @typescript-eslint/no-explicit-any */
export const processCoinData = ({coins}: any) => {
  return coins.reduce((a: any, b: any) => {
    const {id, coinId, name, symbol, price} = b;
    const assets = b.holdings.reduce((a: any, b: any) => {
      const amount = (a?.amount || 0) + b.amount;
      const total =
        ((a.storageTypes && a.storageTypes[b.type]?.total) || 0) + b.amount;
      const coinPrice = price ?? 0;

      return {
        ...a,
        ...{
          amount,
          value: amount * coinPrice,
          storageTypes: {
            ...(a.storageTypes && a.storageTypes),
            [b.type]: {
              name: t(`${HOLDING_TYPES_T_KEY_PATH}.${b.type}`),
              total,
              value: total * coinPrice,
              holdings: [
                b,
                ...((a.storageTypes && a.storageTypes[b.type]?.holdings) || []),
              ],
            },
          },
        },
      };
    }, {});

    return {
      portfolioTotal: (a?.portfolioTotal || 0) + (assets.value ?? 0),
      coins: [
        ...(a.coins ?? []),
        {
          id,
          coinId,
          name,
          symbol,
          price: price || 0,
          amount: assets.amount,
          value: assets.amount * b.price || 0,
          assets,
        },
      ],
    };
  }, {});
};

export const formatAmount = (value: number, location: string) => {
  if (typeof value === 'undefined' || typeof value === null) {
    return (0).toFixed(2);
  }
  return value < 1
    ? value.toFixed(4)
    : new Intl.NumberFormat(location, {minimumFractionDigits: 2}).format(value);
};
