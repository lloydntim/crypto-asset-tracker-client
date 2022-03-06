import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import './App.scss';

/*
  1=BTC
  1027=ETH
  2010=ADA
  2= LTC
  3077= VCH
  2416= THETA
  328=XMR
  1765=EOS
  3822=TFUEL
  1684=QTUM
  52=XRP
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
type HoldingsItemType = {
  slug: string;
  name: string;
  amount: number;
};

type HoldingsType = {
  coinId?: number;
  symbol?: string;
  price?: number;
  currency?: string;
  exchanges: HoldingsItemType[];
  wallets?: HoldingsItemType[];
  staking?: HoldingsItemType[];
  exchangesTotal?: number;
  walletsTotal?: number;
  stakingTotal?: number;
  total?: number;
};

interface RowProps {
  item: HoldingsType;
}

interface RowSectionProps {
  title?: string,
  children: any;
}

interface EditableFieldProps {
  defaultValue?: number | string,
  type: string;
}

type AppDataType = {
  items?: HoldingsType[];
  total?: number;
};
/*
enum Currency {
  'USD',
  'GBP',
  'EUR',
} */

//
const theta: HoldingsType = {
  coinId: 2416,
  symbol: 'THETA',
  exchanges: [{ slug: 'binance', name: 'Binance', amount: 2006.83978752 }],
  wallets: [{ slug: 'theta-wallet', name: 'Theta Wallet', amount: 25010 }],
  // staking: [],
};

const tfuel: HoldingsType = {
  coinId: 3822,
  symbol: 'TFUEL',
  exchanges: [{ slug: 'binance', name: 'Binance', amount: 6000.55128876 }],
  wallets: [{ slug: 'theta-wallet', name: 'Theta Wallet', amount: 720000 }],
  staking: [{ slug: 'theta-wallet', name: 'Theta Wallet', amount: 37879.7868 }],
};

const ada: HoldingsType = {
  coinId: 2010,
  symbol: 'ADA',
  exchanges: [
    { slug: 'binance', name: 'Binance', amount: 174.844775 },
    { slug: 'kraken', name: 'Kraken', amount: 381 },
    { slug: 'coinbase-pro', name: 'Coinbase Pro', amount: 474.309 },
  ],
  wallets: [{ slug: 'yoroi', name: 'Yoroi', amount: 260000.825743 }],
  staking: [{ slug: 'yoroi', name: 'Yoroi', amount: 5784.872774 }],
};

const vch: HoldingsType = {
  coinId: 3077,
  symbol: 'VCH',
  exchanges: [
    { slug: 'binance', name: 'Binance', amount: 204013.1809 },
  ],
  // wallets: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
  // staking: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
};

const eth: HoldingsType = {
  coinId: 1027,
  symbol: 'ETH',
  exchanges: [
    { slug: 'binance', name: 'Binance', amount: 2.0113216 },
  ],
  // wallets: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
  // staking: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
};

const xrp: HoldingsType = {
  coinId: 52,
  symbol: 'XRP',
  exchanges: [
    { slug: 'binance', name: 'Binance', amount: 2281.366 },
  ],
  // wallets: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
  // staking: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
};

const btc: HoldingsType = {
  coinId: 1,
  symbol: 'BTC',
  exchanges: [
    { slug: 'binance', name: 'Binance', amount: 0.02143302 },
  ],
  // wallets: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
  // staking: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
};

const ltc: HoldingsType = {
  coinId: 2,
  symbol: 'LTC',
  exchanges: [
    { slug: 'binance', name: 'Binance', amount: 5.09570000 },
  ],
  // wallets: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
  // staking: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
};

const xmr: HoldingsType = {
  coinId: 328,
  symbol: 'XMR',
  exchanges: [
    { slug: 'binance', name: 'Binance', amount: 2.580667 },
  ],
  // wallets: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
  // staking: [{ slug: 'yoroi', name: 'Yoroi', amount: 0 }],
};
/*
  1=BTC
  1027=ETH
  2010=ADA
  2= LTC
  3077= VCH
  2416= THETA
  328=XMR
  1765=EOS
  3822=TFUEL
  1684=QTUM
  52=XRP
*/

const holdingsItems: HoldingsType[] = [theta, tfuel, ada, vch, eth, xrp, btc, xmr, ltc];

const getTotal = (arr: HoldingsItemType[], price: number) => {
  if (!Array.isArray(arr)) return 0;

  return arr.reduce((a: number, b: HoldingsItemType) => (a + b.amount) * price, 0);
}

const formatToCurrency = (value: number, currency: string, location = 'en-GB') => new Intl.NumberFormat(location, { style: 'currency', currency }).format(value);

const EditableField = ({ defaultValue = '', type }: EditableFieldProps): React.ReactElement<EditableFieldProps> => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditable) inputRef.current.focus();
  }, [isEditable]);

  return !isEditable ? (
    <div onClick={() => {
      setIsEditable(true);
    }}>
      {value}
    </div>
  ) : (
    <div>
      <input
        type={type}
        value={value}
        ref={inputRef}
        onChange={({ target: { value } }) => {
          setValue(value);
        }}
        onBlur={() => {
          setIsEditable(false);
          console.log('update value');
        }}
      />
    </div>
  );
};

const RowSection = ({ title, children }: RowSectionProps): React.ReactElement<RowSectionProps> => (
  <div className="row-section">
    {title && <div className="row-section-title">{title}</div>}
    <div className="row-section-content">
      {children}
    </div>
  </div>
);

const Row = ({ item }: RowProps): React.ReactElement<RowProps> => {
  const [secondaryRowsVisible, setSecondaryRowsVisible] = useState(false);
  const {
    coinId,
    symbol,
    price,
    currency,
    exchanges,
    wallets,
    staking,
    exchangesTotal,
    walletsTotal,
    stakingTotal /* exchanges, wallets, staking, */,
  } = item;
  const total = exchangesTotal + walletsTotal + stakingTotal;

  const rowContentMapper = [
    { title: 'Exchanges', button: 'Add Exchange', holdings: exchanges },
    { title: 'Wallets', button: 'Add Wallet', holdings: wallets },
    { title: 'Staking', button: 'Add Staking', holdings: staking },
  ];

  return (
    <div className="row-container">
      <div className="row-primary" onClick={() => { setSecondaryRowsVisible(!secondaryRowsVisible) }}>
        <RowSection>
          <div className="cell">
            <img className="image" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`} />
          </div>
          <div className="cell">{symbol}</div>
          <div className="cell">{`${formatToCurrency(price, currency, 'en-US')}`}</div>
          <div className="cell">{`${formatToCurrency(total, currency, 'en-US')}`}</div>
        </RowSection>
      </div>

      {secondaryRowsVisible && (
        <div className="row-secondary">
          {
            rowContentMapper.map(({ title, button, holdings }) => {
              if (!holdings) return <div><button>{button}</button></div>;

              return (
                <RowSection key={title} title={title}>
                  {
                    holdings.map(({ name, amount }) => (
                      <div key={name}>
                        <div className="cell"></div>
                        <div className="cell">{name}:</div>
                        {/* <div className="cell">{amount}</div> */}
                        <div className="cell"><EditableField defaultValue={amount} type="number" /></div>
                        <div className="cell">{`${formatToCurrency(amount * price, currency, 'en-US')}`}</div>
                      </div>
                    ))
                  }
                  <button>{button}</button>
                </RowSection>
              );
            })

          }
        </div>
      )}
    </div>
  );
};

export const App = (): React.ReactElement => {
  const [currency, setCurrency] = useState('USD');
  const [data, setData] = useState({});
  const { items, total }: AppDataType = data;

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://lncd-crypto-checker-server.herokuapp.com/api/v1/coins';
      try {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const idList = holdingsItems.map(({ coinId }) => coinId).join(',');
        const response: any = await axios.get(url, {
          params: {
            idList,
            currency,
          },
        });
        /* const response = {
          "data": {
            "1": {
              "id": "1",
              "name": "Bitcoin",
              "symbol": "BTC",
              "slug": "bitcoin",
              "quote": {
                "USD": {
                  "price": 61208.52611842353,
                }
              }
            },
            "52": {
              "id": "52",
              "name": "XRP",
              "symbol": "XRP",
              "slug": "xrp",
              "quote": {
                "USD": {
                  "price": 1.14673037366451,
                }
              }
            },
            "328": {
              "id": "328",
              "name": "Monero",
              "symbol": "XMR",
              "slug": "monero",
              "quote": {
                "USD": {
                  "price": 258.05021228247057,
                }
              }
            },
            "1027": {
              "id": "1027",
              "name": "Ethereum",
              "symbol": "ETH",
              "slug": "ethereum",
              "quote": {
                "USD": {
                  "price": 4496.657444470883,
                }
              }
            },
            "2010": {
              "id": "2010",
              "name": "Cardano",
              "symbol": "ADA",
              "slug": "cardano",
              "quote": {
                "USD": {
                  "price": 1.99114633233048,
                }
              }
            },
            "2416": {
              "id": "2416",
              "name": "THETA",
              "symbol": "THETA",
              "slug": "theta",
              "quote": {
                "USD": {
                  "price": 7.44073193195622,
                }
              }
            },
            "3077": {
              "id": "3077",
              "name": "VeChain",
              "symbol": "VET",
              "slug": "vechain",
              "quote": {
                "USD": {
                  "price": 0.15686197127982,
                }
              }
            },
            "3822": {
              "id": "3822",
              "name": "Theta Fuel",
              "symbol": "TFUEL",
              "slug": "theta-fuel",
              "quote": {
                "USD": {
                  "price": 0.37411459456839,
                }
              }
            }
          }
        };

        // const data = Object.values(response.data);

        */

        const holdingsData = holdingsItems.reduce(
          (
            /* eslint-disable @typescript-eslint/no-explicit-any */
            holdingsDataObject: any,
            { coinId, exchanges, wallets, staking }: HoldingsType,
          ) => {
            return {
              [coinId]: {
                exchanges,
                wallets,
                staking,
              },
              ...holdingsDataObject,
            };
          },
          {},
        );

        const coinsData: any = response.data.results.map(
          ({ price, symbol, id }: { price: number, symbol: string, id: string }) => {
            const { exchanges, wallets, staking } = holdingsData[id];
            const exchangesTotal = getTotal(exchanges, price);
            const walletsTotal = getTotal(wallets, price);
            const stakingTotal = getTotal(staking, price);

            return {
              coinId: id,
              price,
              symbol,
              currency,
              exchanges,
              exchangesTotal,
              wallets,
              walletsTotal,
              staking,
              stakingTotal,
              total: exchangesTotal + walletsTotal + stakingTotal,
            };
          },
        );

        setData({
          items: coinsData,
          total: coinsData.reduce(
            (a: number, b: HoldingsType) => a + b.total,
            0,
          ),
        })
      } catch (error) {
        console.log('error', error);
      };
    };

    fetchData();
  }, [currency]);

  if (!items) {
    return null;
  }

  return (
    <div>
      <h1>Crypto Holdings</h1>

      <div className="table">
        <div className="table-header">
          <div className="cell"></div>
          <div className="cell">Coin</div>
          <div className="cell">Price</div>
          <div className="cell">Holdings</div>
        </div>
        {items.map((item: HoldingsType, index: number) => (
          <Row key={index} item={item} />
        ))}
      </div>
      <br></br>
      <div>{`Total: ${formatToCurrency(total, currency, 'en-US')}`}</div>
      <br></br>
      <select value={currency} onChange={({ target: { value } }) => {
        setCurrency(value);
      }}>
        <option value="USD">USD</option>
        <option value="GBP">GBP</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
  );
};
