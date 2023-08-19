import React, {useState} from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Container,
  EntryField,
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
import {
  CoinData,
  CoinListProps,
  HoldingsListData,
  coinListDialogMapper,
  currenciesOptions,
  currencyFormatMapper,
  formatAmount,
  newCoinSelectOptions,
  processCoinData,
  types,
} from './CoinListHelper';
import {formatToCurrency, slugify} from '../../../utils';
import CoinListHoldingForm from './CoinListHoldingForm';
import {
  BLACK,
  DARKGREY,
  GRAPE_EXTRA_DARK,
  GREY,
  LIGHTGREY,
  WHITE,
} from '../../../constants/colors';
import {useForm} from '../../../hooks';
import {Dialog} from '../../../layouts';

const ClickableArea = styled.button`
  border: none;
  background-color: transparent;
`;

const CoinList = (props: CoinListProps) => {
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
  const {location} = currencyFormatMapper[convert];

  return (
    <>
      {coinListDialogMapper[dialog] && (
        <Dialog
          titleTKey={coinListDialogMapper[dialog]?.titleTKey}
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
          <Text tKey={coinListDialogMapper[dialog]?.messageTKey} />
        </Dialog>
      )}
      <Container mv={32} align-c>
        <Box flex-row mv={12}>
          <Button
            mr={12}
            color={GRAPE_EXTRA_DARK}
            onClick={() => {
              onToggleEditMode(!editMode);
            }}
            tKey={`common:button.${editMode ? 'save' : 'edit'}`}
          />
          <Select options={currenciesOptions} onChange={onChangeCurrency} />
        </Box>

        <Container
          bgcolor={WHITE}
          color={BLACK}
          br={8}
          p={20}
          mv={4}
          flex-h
          spc-btw
        >
          <Text strong tKey="welcome:coinlist.text.myPortfolio" />
          <Text
            tKey="welcome:coinlist.text.portfolioTotal"
            tOptions={{
              total: formatToCurrency(portfolioTotal, convert, location),
            }}
          />
        </Container>

        {editMode && (
          <Container flex-row align-m>
            <Form ph={8} pt={12} flex-row w="100%" align-t>
              <Select
                mh={8}
                options={newCoinSelectOptions}
                onChange={(value) => setNewCoinSelectOption(value)}
              />

              <Input
                mh={8}
                name={newCoin.name}
                value={newCoin.value}
                required={newCoin.required}
                onChange={formFieldChangeHandler}
                {...(newCoinSelectOption === 'preset' && {
                  dataList: symbols?.map(({id: value, name: text}) => ({
                    text,
                    value,
                  })),
                })}
              />

              <IconButton
                type="plus"
                align-c
                flex-row
                mh={8}
                onClick={() => {
                  if (typeof newCoin.value !== 'undefined' && symbols) {
                    const [symbol]: {id: string; name: string}[] =
                      symbols.filter(({name}) => name === newCoin.value);

                    const addCoinArgs =
                      newCoinSelectOption === 'other'
                        ? {symbol: symbol.id}
                        : {slug: slugify(newCoin.value)};

                    onAddCoin(addCoinArgs);
                    formFieldChangeHandler({name: 'newCoin', value: ''});
                  }
                }}
              />
            </Form>
          </Container>
        )}

        <List<CoinData>
          lst-stl="none"
          mv={8}
          p={0}
          data={testCoins}
          renderItem={({
            item: {id, coinId, name, assets, price, amount, value},
            index,
          }) => {
            const {storageTypes} = assets;
            const holdingsList: HoldingsListData[] = Object.values(
              storageTypes ?? {},
            );

            return (
              <Container>
                {/* ListSection */}
                <Box
                  className="coin-list-item"
                  flex-row
                  bgcolor={WHITE}
                  pv={16}
                  ph={12}
                  br={8}
                  mv={4}
                >
                  <ClickableArea
                    onClick={() => {
                      setSelectedCoin(index);
                      onChange();
                    }}
                  >
                    <Table>
                      <TableRow>
                        <TableCell $valign-m $col-w={40}>
                          <Image
                            flex-row
                            sz={24}
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coinId}.png`}
                          />
                        </TableCell>
                        <TableCell $valign-m $col-w={140} $txt-align-l>
                          {name}
                        </TableCell>
                        <TableCell $valign-m $col-w={120} $txt-align-r>
                          {formatToCurrency(price, convert, location)}
                        </TableCell>
                        <TableCell $valign-m $col-w={160} $txt-align-r>
                          {formatAmount(amount, location)}
                        </TableCell>
                        <TableCell $valign-m ph={12} $col-w={120} $txt-align-r>
                          {formatToCurrency(value, convert, location)}
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
                          <Box key={keyIndex} mb={12} className="holding">
                            <Headline m={0} p={0} pb={12} size="h5">
                              {title} Total: {formatAmount(total, location)}
                            </Headline>

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
                                        $valign-m
                                      >
                                        <Box
                                          bgcolor={GREY}
                                          sz={24}
                                          br={12}
                                          flex-row
                                        />
                                      </Box>
                                      <Box flex="1" $txt-alignn-l>
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
                                          <Text $valign-m m={0} font-sz={14}>
                                            {name}
                                          </Text>
                                        )}
                                      </Box>
                                      <Box flex-row w={162} align-r ph={12}>
                                        {editMode ? (
                                          <>
                                            <EntryField
                                              location={location}
                                              value={amount.toString()}
                                              onBlur={({target: {value}}) => {
                                                setSelectedCoin(index);
                                                onUpdateCoinHolding(holdingId, {
                                                  amount: parseFloat(value),
                                                });
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <Text $valign-m font-sz={14}>
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
                                        <Text $valign-m font-sz={14}>
                                          {formatToCurrency(
                                            value,
                                            convert,
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
