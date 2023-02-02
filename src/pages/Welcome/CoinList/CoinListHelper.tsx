import {CoinData} from './CoinList';

enum HoldingTypes {
  WALLET = 'wallet',
  EXCHANGE = 'exchange',
  STAKING = 'staking',
}

// type HoldingType = Record<HoldingTypes, string>;

const listNameMapper: {[key: string]: string} = {
  wallet: 'Wallet',
  exchange: 'Exchange',
  staking: 'Staking',
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const processCoinHoldingsData = (data: any[]) =>
  data.reduce((a, b) => {
    return {
      ...a,
      ...{
        [b.type]: {
          name: listNameMapper[b.type],
          total: (a[b.type]?.total || 0) + b.amount,
          holdings: a[b.type]?.holdings ? [b, ...a[b.type].holdings] : [b],
        },
      },
    };
  }, {});

export const coinData: CoinData[] = [
  {
    id: '0',
    coinId: '1',
    name: 'btc',
    symbol: 'BTC',
    price: 22000,
    holdings: [
      {
        id: 'ledger',
        name: 'Legder',
        type: 'wallet',
        amount: 0.25,
      },
      {
        id: 'trezor',
        name: 'Trezor',
        type: 'wallet',
        amount: 0.5,
      },
      {
        id: 'coinbase',
        name: 'Coinbase',
        type: 'exchange',
        amount: 1,
      },
      {
        id: 'binance',
        name: 'Binance',
        type: 'exchange',
        amount: 2,
      },
      {
        id: 'coinbase',
        name: 'Coinbase',
        type: 'staking',
        amount: 1,
      },
      {
        id: 'binance',
        name: 'Binance',
        type: 'staking',
        amount: 2,
      },
    ],
  },
  {
    id: '5',
    coinId: '1027',
    name: 'eth',
    symbol: 'ETH',
    price: 1600,
    holdings: [
      {
        id: 'ledger',
        name: 'Legder',
        type: 'wallet',
        amount: 2,
      },
      {
        id: 'trezor',
        name: 'Trezor',
        type: 'wallet',
        amount: 3,
      },
      {
        id: 'kraken',
        name: 'Kraken',
        type: 'exchange',
        amount: 15,
      },
      {
        id: 'FTX',
        name: 'FTX',
        type: 'exchange',
        amount: 5,
      },
    ],
  },
];

/*{
  portfolioTotal: 100000,
  coins: [
    {
      id: ,
      coinId: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '22000'
      amount: 2.5,
      value: 66000,
      holdings: [
        {
          name: 'Wallets',
          amount: 2.5,
          value: 55.000,
          holdings: [
            {
              name: 'Trezor',
              amount: 2,
              value: 44000
            },
            {
              name: 'Ledger',
              amount: .5,
              value: 11000
            }
          ]
        },
        {
          name: 'Exchanges',
          amount: 1,
          value: 22000,
          holdings: [
            {
              name: 'Binance',
              amount: .5,
              value: 11000
            },
            {
              name: 'Coibase',
              amount: .5,
              value: 11000
            }
          ]
        },
      ]
    },
    {
      coin: 'eth',
      price: '1500'
      holdings: [
        {
          name: 'Wallets',
          total: 55.000,
          holdings: [
            {
              name: 'Trezor',
              amount: 2,
              value: 44000
            },
            {
              name: 'Ledger',
              amount: .5,
              value: 11000
            }
          ]
        },
        {
          name: 'Exchanges',
          total: 22000,
          holdings: [
            {
              name: 'Binance',
              amount: .5,
              value: 11000
            },
            {
              name: 'Coibase',
              amount: .5,
              value: 11000
            }
          ]
        },
      ]
    },
  ]
}*/
