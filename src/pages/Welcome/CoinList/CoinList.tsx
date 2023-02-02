import React, {FC, useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {Box, Button, Container, List, Select, Text} from '../../../components';
import Table, {TableCell, TableRow} from '../../../components/Table';
import {processCoinHoldingsData} from './CoinListHelper';
import {formatToCurrency} from '../../../utils';
import CoinListHoldingForm from './CoinListHoldingForm';

type HoldingType = 'wallet' | 'exchange' | 'staking';

interface HoldingsData {
  id: string;
  name: string;
  type: HoldingType;
  amount: number;
}

export interface CoinData {
  id: string;
  coinId: string;
  name: string;
  symbol: string;
  price: number;
  holdings: HoldingsData[];
}

interface HoldingsListData {
  name: HoldingType;
  total: number;
  holdings: HoldingsData[];
}

const ClickableArea = styled.button`
  border: none;
  background-color: transparent;
`;

const CustomButton = styled.button`
  border: none;
  background-color: white;
  color: black;
`;

const CustomInput = styled.input`
  color: black;
`;

interface CoinListProps {
  data: {coins: CoinData[]; convert: string};
  onChange: () => void;
  onAddCoin: (symbol: string) => void;
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
}

const types = [
  {
    value: 'wallet',
    text: 'Wallet',
  },
  {
    value: 'staking',
    text: 'Staking',
  },
  {
    value: 'exchange',
    text: 'Exchange',
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const EntryField = ({
  value,
  onChange,
  onBlur,
}: {
  value: string | number;
  onChange?: (args?: any) => void;
  onBlur?: (args?: any) => void;
}) => {
  const [entryEditMode, setEntryEditMode] = useState(false);
  const [entryValue, setEntryValue] = useState(value);
  const input = useRef(null);

  useEffect(() => {
    if (entryEditMode) input?.current.focus();
  }, [entryEditMode]);

  return (
    <Box>
      {entryEditMode ? (
        <CustomInput
          ref={input}
          value={entryValue}
          onChange={(props) => {
            setEntryValue(props.target.value);
            if (onChange) onChange(props);
          }}
          onBlur={(props) => {
            setEntryEditMode(false);
            if (onBlur) onBlur(props);
          }}
        />
      ) : (
        <>
          <Text>
            {entryValue}
            <CustomButton
              onClick={() => {
                setEntryEditMode(true);
              }}
            >
              update
            </CustomButton>
          </Text>
        </>
      )}
    </Box>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const testData = ({coins}: any) => {
  const listNameMapper: {[key: string]: string} = {
    wallet: 'Wallet',
    exchange: 'Exchange',
    staking: 'Staking',
  };

  return coins.reduce((a: any, b: any) => {
    const {id, coinId, name, symbol, price} = b;

    const holdings = b.holdings.reduce((c: any, d: any) => {
      const amount = (c.amount ?? 0) + d.amount;
      const value = amount * b.price;
      return [
        ...(c.holdings ?? []),
        {
          amount,
          value,
          name: listNameMapper[d.type],
          holdings: [d, ...(c[d.type]?.holdings || [])],
        },
      ];
    }, []);

    const coinsAmount = holdings.reduce(
      (a: any, b: any) => (a.amount ?? 0) + b.amount,
      0,
    );

    return {
      portfolioTotal: coins.reduce(
        (a: any, b: any) =>
          b.holdings.reduce((c: any, d: any) => c + d.amount, 0) * b.price + a,
        0,
      ),
      coins: [
        ...(a.coins ?? []),
        {
          id,
          coinId,
          name,
          symbol,
          price,
          amount: coinsAmount,
          value: coinsAmount * b.price,
          holdings,
        },
      ],
    };
  }, {});
};

const CoinList: FC<CoinListProps> = ({
  data,
  onChange,
  onAddCoin,
  onRemoveCoin,
  onAddCoinHolding,
  onUpdateCoinHolding,
  onRemoveCoinHolding,
}) => {
  const {coins, convert} = data;
  const [currentCollapsedItem, setCurrentCollapsedItem] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [coinName, setCoinName] = useState('');
  const [holding, setHolding] = useState({
    type: types[0].value,
    name: '',
    amount: '',
  });

  console.log('CoinList inside', coins);
  console.log('CoinList test new', testData(data));
  const totalHoldings = coins?.reduce(
    (a, b) => b.holdings.reduce((c, d) => c + d.amount, 0) * b.price + a,
    0,
  );
  return (
    <Container>
      <CustomButton
        onClick={() => {
          setEditMode(!editMode);
        }}
      >
        {editMode ? 'Save' : 'Edit'}
      </CustomButton>

      <Container color="grey" p={20} flex-h spc-btw>
        <Text>My Portfolio</Text>
        <Text>Total: {formatToCurrency(totalHoldings, convert)}</Text>
      </Container>
      <List<CoinData>
        data={coins || []}
        renderItem={({item: {id, coinId, name, holdings, price}, index}) => {
          const totalHoldingsAmount = holdings.reduce(
            (a, b) => a + b.amount,
            0,
          );
          const totalValue = totalHoldingsAmount * price;
          const holdingsList: HoldingsListData[] = Object.values(
            processCoinHoldingsData(holdings),
          );

          return (
            <Container>
              {/* ListSection */}
              <Box color="grey" pv={20} ph={20} br={20} w={780}>
                <ClickableArea
                  onClick={() => {
                    console.log(index);
                    setCurrentCollapsedItem(index);
                    onChange();
                  }}
                >
                  <Table>
                    <TableRow>
                      <TableCell ph={12}>
                        <img
                          width={24}
                          height={24}
                          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`}
                        />
                      </TableCell>
                      <TableCell ph={12}>{name}</TableCell>
                      <TableCell ph={12}>
                        {formatToCurrency(price, convert)}
                      </TableCell>
                      <TableCell ph={12}>{totalHoldingsAmount}</TableCell>
                      <TableCell ph={12}>
                        {formatToCurrency(totalValue, convert)}
                      </TableCell>
                    </TableRow>
                  </Table>
                </ClickableArea>
                {editMode && (
                  <CustomButton
                    onClick={() => {
                      onRemoveCoin(id);
                    }}
                  >
                    remove
                  </CustomButton>
                )}
              </Box>

              {/*  ListSubSection*/}
              {currentCollapsedItem === index && (
                <Box>
                  {holdingsList.map(
                    ({holdings: items, total, name: title}, keyIndex) => {
                      return (
                        <Box key={keyIndex}>
                          <Box>
                            {title} Total: {total}
                          </Box>

                          {items.map(
                            ({id: holdingId, name, amount, type}, keyIndex) => {
                              const value = price * amount;

                              return (
                                <Table key={keyIndex}>
                                  <TableRow>
                                    <TableCell ph={12}>Logo</TableCell>
                                    <TableCell ph={12}>
                                      {editMode ? (
                                        <EntryField
                                          value={name}
                                          onBlur={({target: {value}}) => {
                                            onUpdateCoinHolding(holdingId, {
                                              name: value,
                                            });
                                          }}
                                        />
                                      ) : (
                                        <Text>{name}</Text>
                                      )}
                                    </TableCell>
                                    <TableCell ph={12}>
                                      {editMode ? (
                                        <>
                                          <EntryField
                                            value={amount}
                                            onBlur={({target: {value}}) => {
                                              onUpdateCoinHolding(holdingId, {
                                                amount: parseFloat(value),
                                              });
                                            }}
                                          />
                                        </>
                                      ) : (
                                        <Text>{amount ?? 0}</Text>
                                      )}
                                    </TableCell>
                                    <TableCell ph={12}>
                                      {formatToCurrency(value, convert)}
                                    </TableCell>
                                    {editMode && (
                                      <CustomButton
                                        onClick={() => {
                                          onRemoveCoinHolding(holdingId);
                                        }}
                                      >
                                        remove
                                      </CustomButton>
                                    )}
                                  </TableRow>
                                </Table>
                              );
                            },
                          )}
                        </Box>
                      );
                    },
                  )}
                  {editMode && (
                    <CoinListHoldingForm
                      holding={holding}
                      submitText="add"
                      onChange={({
                        field,
                        value,
                      }: {
                        field: string;
                        value: string;
                      }) => {
                        setHolding({...holding, [field]: value});
                      }}
                      onSubmit={() => {
                        onAddCoinHolding(id, {
                          amount: parseFloat(holding.amount),
                          type: holding.type,
                          name: holding.name,
                          currency: name,
                        });
                      }}
                    />
                  )}
                </Box>
              )}
            </Container>
          );
        }}
      />
      {editMode && (
        <Container>
          <form>
            <Text>Coin</Text>
            <CustomInput
              value={coinName}
              onChange={({target: {value}}) => {
                setCoinName(value);
              }}
            />
            <CustomButton
              onClick={() => {
                onAddCoin(coinName);
              }}
            >
              add
            </CustomButton>
          </form>
        </Container>
      )}
    </Container>
  );
};

export default CoinList;
