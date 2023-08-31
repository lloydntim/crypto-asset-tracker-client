import React, {useState} from 'react';
import {
  Container,
  Form,
  IconButton,
  Input,
  List,
  Select,
  Text,
} from '../../../components';
import {
  AddNewCoinOptions,
  CoinListItem,
  CoinListProps,
  StorageOptionType,
  coinListDialogMapper,
  currenciesOptions,
  currencyFormatMapper,
  newCoinSelectOptions,
  types,
} from './CoinListHelper';
import {slugify} from '../../../utils';
import {useForm} from '../../../hooks';
import {Dialog} from '../../../layouts';
import CoinListItemSection from './CoinListItemSection';
import CoinListStorageOptions from './CoinListStorageOptions';
import CoinListHolding from './CoinListHolding';
import CoinListTitleSection from './CoinListTitleSection';

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
    type: types[0].value as StorageOptionType,
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

  const {balance, coins: coinList} = data;
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
      <Container $mv={32} $align-c>
        <CoinListTitleSection
          {...{
            balance,
            editMode,
            convert,
            location,
            onToggleEditMode,
            onChangeCurrency,
            currenciesOptions,
          }}
        />

        {editMode && (
          <Container $flex-row $align-m>
            <Form $ph={8} $pt={12} $flex-row $w="100%" $align-t>
              <Select
                $mh={8}
                options={newCoinSelectOptions}
                onChange={(value) => setNewCoinSelectOption(value)}
              />

              <Input
                $mh={8}
                name={newCoin.name}
                value={newCoin.value}
                required={newCoin.required}
                onChange={formFieldChangeHandler}
                {...(newCoinSelectOption ===
                  (AddNewCoinOptions.PRESET as string) && {
                  dataList: symbols?.map(({id: value, name: text}) => ({
                    text,
                    value,
                  })),
                })}
              />

              <IconButton
                type="plus"
                $align-c
                $flex-row
                $mh={8}
                onClick={() => {
                  if (typeof newCoin.value !== 'undefined' && symbols) {
                    const [symbol]: {id: string; name: string}[] =
                      symbols.filter(({name}) => name === newCoin.value);
                    const addCoinArgs =
                      newCoinSelectOption ===
                      (AddNewCoinOptions.PRESET as string)
                        ? {symbol: symbol?.id}
                        : {slug: slugify(newCoin.value)};

                    onAddCoin(addCoinArgs);
                    formFieldChangeHandler({name: 'newCoin', value: ''});
                  }
                }}
              />
            </Form>
          </Container>
        )}

        <List<CoinListItem>
          $lst-stl="none"
          $mv={8}
          $p={0}
          data={coinList}
          renderItem={({
            item: {id, coinId, name, price, value, total, storageOptions},
            index,
          }) => {
            return (
              <>
                <CoinListItemSection
                  {...{
                    name,
                    coinId,
                    editMode,
                    value,
                    total,
                    location,
                    convert,
                    price,
                  }}
                  onClick={() => {
                    setSelectedCoin(index);
                    if (onChange) onChange();
                  }}
                  deleteButtonClickHandler={() => {
                    setDialog('removeCoin');
                    setRemovedItemId(id);
                  }}
                />

                {selectedCoin === index && (
                  <CoinListStorageOptions
                    editMode={editMode}
                    location={location}
                    options={storageOptions}
                    holdingValue={holding}
                    onChangeHoldingValue={({field, value}) => {
                      setHolding({...holding, [field]: value});
                    }}
                    onSubmitOptionHolding={() => {
                      onAddCoinHolding(id, {
                        amount: parseFloat(holding.amount),
                        type: holding.type,
                        name: holding.name,
                      });
                      setHolding({...holding, amount: '', name: ''});
                    }}
                    renderOption={({holdings}, index) => {
                      return (
                        <>
                          {holdings.map(
                            (
                              {id: holdingId, value, name, amount},
                              keyIndex: number,
                            ) => {
                              return (
                                <CoinListHolding
                                  key={keyIndex}
                                  updateCoinHoldingHandler={({
                                    key,
                                    value: holdingValue,
                                  }) => {
                                    onUpdateCoinHolding(holdingId, {
                                      [key]:
                                        key === 'amount'
                                          ? parseFloat(holdingValue)
                                          : holdingValue,
                                    });
                                  }}
                                  removeCoinHoldingHandler={() => {
                                    setRemovedItemId(holdingId);
                                    setDialog('removeCoinHolding');
                                  }}
                                  {...{
                                    id,
                                    value,
                                    name,
                                    amount,
                                    location,
                                    editMode,
                                    convert,
                                    index,
                                  }}
                                />
                              );
                            },
                          )}
                        </>
                      );
                    }}
                  />
                )}
              </>
            );
          }}
        />
      </Container>
    </>
  );
};

export default CoinList;
