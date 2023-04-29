import React, {FC, useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Container,
  Form,
  Headline,
  IconButton,
  Image,
  Input,
  List,
  Select,
  Text,
} from '../../../components';
import Table, {TableCell, TableRow} from '../../../components/Table';
import {formatAmount, processCoinData} from './CoinListHelper';
import {formatToCurrency} from '../../../utils';
import CoinListHoldingForm from './CoinListHoldingForm';
import {
  BLACK,
  DARKGREY,
  GRAPE_EXTRA_DARK,
  GRAPE_DARK,
  GREY,
  LIGHTGREY,
  WHITE,
} from '../../../constants/Colors';
import {useForm} from '../../../hooks';
import {Dialog} from '../../../layouts';

type HoldingType = 'wallet' | 'exchange' | 'staking';

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

interface AssetData {
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

interface HoldingsListData {
  name: HoldingType;
  total: number;
  holdings: HoldingsData[];
}

const ClickableArea = styled.button`
  border: none;
  background-color: transparent;
`;

const CustomInput = styled.input`
  color: black;
  padding: 6px 8px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${GRAPE_DARK};
  display: flex;
  margin: 8px;
  flex: 1;
  ${({w}: {w?: number}) => (w ? `width: ${w}px;` : '')}
`;

const currencyFormatMapper: {
  [key: string]: {currency: string; location: string};
} = {
  USD: {currency: 'USD', location: 'en-US'},
  GBP: {currency: 'GBP', location: 'en-GB'},
  EUR: {currency: 'EUR', location: 'de-DE'},
};

interface CoinListProps {
  data: {coins: CoinData[]};
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
  onToggleEditMode: (args: boolean) => void;
  onChangeCurrency: (value: string) => void;
  selectedCoin: number | undefined;
  setSelectedCoin: (item: number) => void;
  editMode: boolean;
  convert: string;
  symbols: {name: string; id: string}[];
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

const newCoinSelectOptions = [
  {value: 'preset', text: 'Preset'},
  {value: 'other', text: 'Other'},
];

/* eslint-disable @typescript-eslint/no-explicit-any */
const EntryField = ({
  value,
  onChange,
  onBlur,
  location,
}: {
  value: any;
  onChange?: (args?: any) => void;
  onBlur?: (args?: any) => void;
  location: string;
}) => {
  const [entryEditMode, setEntryEditMode] = useState(false);
  const [entryValue, setEntryValue] = useState(value);

  const input = useRef(null);

  useEffect(() => {
    if (entryEditMode) input?.current?.focus();
  }, [entryEditMode]);

  return (
    <Box flex-row align-m spc-btw>
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
          <Text font-sz={14}>
            {typeof value === 'number'
              ? formatAmount(entryValue, location)
              : entryValue}
          </Text>
          <IconButton
            mh={8}
            type="edit"
            iconSize={16}
            onClick={() => {
              setEntryEditMode(true);
            }}
          />
        </>
      )}
    </Box>
  );
};

const currencies = [
  {text: 'USD', value: 'USD'},
  {text: 'GBP', value: 'GBP'},
  {text: 'EUR', value: 'EUR'},
];

const coinListDialogMapper: {
  [key: string]: {title: string; message: string; callback: string};
} = {
  removeCoin: {
    title: 'Remove Coin',
    message: 'Do you really want to remove this coin?',
    callback: 'onRemoveCoin',
  },
  removeCoinHolding: {
    title: 'Remove Coin Holding',
    message: 'Do you really want to remove this coin holding?',
    callback: 'onRemoveCoinHolding',
  },
};

const CoinList: FC<CoinListProps> = (props) => {
  const {
    data,
    onChange,
    onAddCoin,
    onRemoveCoin,
    onAddCoinHolding,
    onUpdateCoinHolding,
    onRemoveCoinHolding,
    onToggleEditMode,
    onChangeCurrency,
    selectedCoin,
    setSelectedCoin,
    editMode,
    convert,
    symbols,
  } = props;
  const [holding, setHolding] = useState({
    type: types[0].value,
    name: '',
    amount: '',
  });

  const [newCoinSelectOption, setNewCoinSelectOption] = useState(
    newCoinSelectOptions[0].value,
  );

  const [dialog, setDialog] = useState('');
  const [removedItemId, setRemovedItemId] = useState('');

  const {
    form: {newCoin},
    formFieldChangeHandler,
  } = useForm('newCoin*');

  const {portfolioTotal, coins: testCoins = []} = processCoinData(data);
  const {currency: formatCurrency, location} = currencyFormatMapper[convert];

  return (
    <>
      {coinListDialogMapper[dialog] && (
        <Dialog
          title={coinListDialogMapper[dialog]?.title}
          visible={!!dialog}
          onCancelButtonClick={() => setDialog('')}
          onContinueButtonClick={() => {
            setDialog('');
            formFieldChangeHandler({name: 'newCoin', value: ''});
            setHolding({...holding, amount: '', name: ''});
            if (dialog === 'removeCoin') return onRemoveCoin(removedItemId);
            onRemoveCoinHolding(removedItemId);
          }}
        >
          {coinListDialogMapper[dialog]?.message}
        </Dialog>
      )}
      <Container align-c>
        <Box flex-row mv={12}>
          <Button
            mr={12}
            color={GRAPE_EXTRA_DARK}
            onClick={() => {
              onToggleEditMode(!editMode);
            }}
          >
            {editMode ? 'Save' : 'Edit'}
          </Button>

          <Select options={currencies} onChange={onChangeCurrency} />
        </Box>

        <Container
          bgcolor={WHITE}
          color={BLACK}
          w={640}
          br={8}
          p={20}
          mv={4}
          flex-h
          spc-btw
        >
          <Text strong>My Portfolio</Text>
          <Text>
            Total: {formatToCurrency(portfolioTotal, formatCurrency, location)}
          </Text>
        </Container>

        {editMode && (
          <Container flex-row align-m>
            <Form ph={8} flex-row w="100%" align-t>
              <Select
                m={8}
                options={newCoinSelectOptions}
                onChange={(value) => setNewCoinSelectOption(value)}
              />

              <Input
                name={newCoin.name}
                value={newCoin.value}
                required={newCoin.required}
                onChange={formFieldChangeHandler}
                {...(newCoinSelectOption === 'preset' && {
                  dataList: symbols.map(({id: value, name: text}) => ({
                    text,
                    value,
                  })),
                })}
              />

              <IconButton
                type="plus"
                align-c
                flex-row
                m={8}
                onClick={() => {
                  if (typeof newCoin.value !== 'undefined')
                    onAddCoin(newCoin.value);
                }}
              />
            </Form>
          </Container>
        )}

        <List<CoinData>
          data={testCoins}
          renderItem={({
            item: {id, coinId, name, assets, price, amount, value},
            index,
          }) => {
            const {storageTypes} = assets;
            console.log('assets', assets);
            const holdingsList: HoldingsListData[] = Object.values(
              storageTypes ?? {},
            );

            return (
              <Container>
                {/* ListSection */}
                <Box
                  flex-row
                  bgcolor={WHITE}
                  pv={16}
                  ph={12}
                  br={8}
                  mv={4}
                  w={640}
                >
                  <ClickableArea
                    onClick={() => {
                      setSelectedCoin(index);
                      onChange();
                    }}
                  >
                    <Table>
                      <TableRow>
                        <TableCell valign-m col-w={40}>
                          <Image
                            flex-row
                            sz={24}
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`}
                          />
                        </TableCell>
                        <TableCell valign-m col-w={140} txt-align-l>
                          {name}
                        </TableCell>
                        <TableCell valign-m col-w={120} txt-align-r>
                          {formatToCurrency(price, formatCurrency, location)}
                        </TableCell>
                        <TableCell valign-m col-w={160} txt-align-r>
                          {formatAmount(amount, location)}
                        </TableCell>
                        <TableCell valign-m ph={12} col-w={120} txt-align-r>
                          {formatToCurrency(value, formatCurrency, location)}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </ClickableArea>
                  {editMode && (
                    <IconButton
                      mh={8}
                      type="delete"
                      iconSize={16}
                      onClick={() => {
                        setDialog('removeCoin');
                        setRemovedItemId(id);
                      }}
                    />
                  )}
                </Box>

                {/*  ListSubSection*/}
                {selectedCoin === index && (
                  <Box
                    bgcolor={LIGHTGREY}
                    color={DARKGREY}
                    pv={20}
                    ph={24}
                    br={8}
                    hide={!editMode && holdingsList.length === 0}
                  >
                    {holdingsList.map(
                      (
                        {holdings: items, total, name: title},
                        keyIndex: number,
                      ) => {
                        return (
                          <Box key={keyIndex} mb={12}>
                            <Box>
                              <Headline m={0} p={0} pb={12} size="h5">
                                {title} Total: {formatAmount(total, location)}{' '}
                              </Headline>
                            </Box>

                            {items.map(
                              (
                                {id: holdingId, name, amount},
                                keyIndex: number,
                              ) => {
                                const value = price * amount;

                                return (
                                  <Table key={keyIndex} w="100%">
                                    <Box
                                      flex-row
                                      br={8}
                                      ph={8}
                                      align-m
                                      bgcolor="#d6cfe3"
                                      mv={2}
                                    >
                                      <Box
                                        pl={8}
                                        br-tl={8}
                                        br-bl={8}
                                        w={44}
                                        pv={4}
                                        valign-m
                                      >
                                        <Box
                                          bgcolor={GREY}
                                          sz={24}
                                          br={12}
                                          flex-row
                                        />
                                      </Box>
                                      <Box flex="1" txt-align-l>
                                        {editMode ? (
                                          <EntryField
                                            location={location}
                                            value={name}
                                            onBlur={({target: {value}}) => {
                                              onUpdateCoinHolding(holdingId, {
                                                name: value,
                                              });
                                            }}
                                          />
                                        ) : (
                                          <Text valign-m m={0} font-sz={14}>
                                            {name}
                                          </Text>
                                        )}
                                      </Box>
                                      <Box flex-row w={162} align-r ph={12}>
                                        {editMode ? (
                                          <>
                                            <EntryField
                                              location={location}
                                              value={amount}
                                              onBlur={({target: {value}}) => {
                                                setSelectedCoin(index);
                                                onUpdateCoinHolding(holdingId, {
                                                  amount: parseFloat(value),
                                                });
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <Text valign-m font-sz={14}>
                                            {formatAmount(amount, location)}
                                          </Text>
                                        )}
                                      </Box>
                                      <Box
                                        w={100}
                                        flex-row
                                        align-r
                                        br-tr={8}
                                        br-br={8}
                                        pr={8}
                                      >
                                        <Text valign-m font-sz={14}>
                                          {formatToCurrency(
                                            value,
                                            formatCurrency,
                                            location,
                                          )}
                                        </Text>
                                      </Box>
                                      {editMode && (
                                        <IconButton
                                          mh={8}
                                          type="delete"
                                          iconSize={18}
                                          onClick={() => {
                                            setRemovedItemId(holdingId);
                                            setDialog('removeCoinHolding');
                                          }}
                                        />
                                      )}
                                    </Box>
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
                        onChange={({field, value}) => {
                          setHolding({...holding, [field]: value});
                        }}
                        onSubmit={() => {
                          onAddCoinHolding(id, {
                            amount: parseFloat(holding.amount),
                            type: holding.type,
                            name: holding.name,
                            currency: name,
                          });
                          setHolding({...holding, amount: '', name: ''});
                        }}
                      />
                    )}
                  </Box>
                )}
              </Container>
            );
          }}
        />
      </Container>
    </>
  );
};

export default CoinList;
