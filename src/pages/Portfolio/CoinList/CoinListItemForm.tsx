import React, {useMemo, useState} from 'react';
import {
  Container,
  IconButton,
  Input,
  Form,
  Select,
  Message,
} from '../../../components';
import {
  Coin,
  CoinSymbol,
  NewCoinOptions,
  coinSelectOptions,
} from './CoinListHelper';
import {useForm} from '../../../hooks';
import {InMemoryCache, useMutation, useQuery} from '@apollo/client';
import {
  ADD_COIN,
  GET_COIN_LIST,
  GET_COIN_SYMBOLS,
} from '../../../graphql/operations';
import {useAuthentication} from '../../../providers/AuthenticationProvider';
import {displayResponseErrorMessage} from '../../../helpers/displayResponseErrorMessage';
import {slugify} from '../../../utils';

interface CoinListItemFormProps {
  coins: Coin[];
  visible: boolean;
  currency: string;
}

export const NEW_COIN_INPUT_PATTERN = /[a-zA-Z]$/g;
export const NEW_COIN_INPUT_MIN_LENGTH = 3;
export const NEW_COIN_INPUT_MAX_LENGTH = 25;

const CoinListItemForm = ({
  coins,
  visible,
  currency,
}: CoinListItemFormProps) => {
  const {currentUser} = useAuthentication();
  const creatorId = currentUser().id;
  const getCoinListQueryVariables = {creatorId, convert: currency};
  const cacheQueryParams = {
    query: GET_COIN_LIST,
    variables: getCoinListQueryVariables,
  };

  const {
    form: {newCoin},
    resetForm,
    isFormValid,
    formFieldChangeHandler,
  } = useForm('newCoin*');

  const [coinSelectOption, setCoinSelectOption] = useState(
    coinSelectOptions[0].value,
  );

  const {
    data: getCoinSymbolsQueryData,
    loading: getCoinSymbolsQueryLoading,
    error: getCoinSymbolsQueryError,
  } = useQuery(GET_COIN_SYMBOLS, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-only',
  });

  const [
    addCoin,
    {loading: addCoinMutationLoading, error: addCoinMutationError},
  ] = useMutation(ADD_COIN, {
    errorPolicy: 'all',
    update: (cache: InMemoryCache, {data: {addCoin: newCoin}}: any) => {
      if (!newCoin) return;

      const existingCoins: any = cache.readQuery(cacheQueryParams);
      const {balance, coins} = existingCoins.getCoinList;

      cache.writeQuery({
        ...cacheQueryParams,
        data: {
          getCoinList: {
            balance,
            coins: [...coins, newCoin],
          },
        },
      });
    },
  });

  const {getCoinSymbols: symbols = []} = getCoinSymbolsQueryData ?? {};
  const dataList = useMemo(() => {
    const selectedSymbols = coins.map((coin) => coin.symbol);

    return symbols
      .filter((symbol: CoinSymbol) => !selectedSymbols.includes(symbol.id))
      .map(({id: value, name: text}: CoinSymbol) => ({
        text,
        value,
      }));
  }, [symbols, coins]);

  const loading = getCoinSymbolsQueryLoading || addCoinMutationLoading;
  const error = getCoinSymbolsQueryError || addCoinMutationError;
  const isPresetSelected =
    coinSelectOption === (NewCoinOptions.PRESET as string);

  const addCoinHandler = () => {
    if (symbols.length) {
      const [symbol]: CoinSymbol[] = symbols.filter(
        ({name}: CoinSymbol) => name === newCoin.value,
      );
      const args = isPresetSelected
        ? {symbol: symbol?.id}
        : {slug: slugify(newCoin.value)};

      addCoin({variables: {...args, creatorId}});
      resetForm();
    }
  };

  if (!visible) return null;

  return (
    <Container $flex-col $align-m>
      <Form $ph={8} $pt={12} $flex-row $w="100%" $align-t>
        <Select
          $mh={8}
          options={coinSelectOptions}
          onChange={(value) => {
            setCoinSelectOption(value);
            resetForm();
          }}
        />

        <Input
          $mh={8}
          name={newCoin.name}
          value={newCoin.value}
          required={newCoin.required}
          onChange={formFieldChangeHandler}
          placeholderTKey="portfolio:coinlist.input.placeholder.addCoin"
          pattern={NEW_COIN_INPUT_PATTERN}
          minLength={NEW_COIN_INPUT_MIN_LENGTH}
          maxLength={NEW_COIN_INPUT_MAX_LENGTH}
          {...(isPresetSelected && {
            dataList,
          })}
        />

        <IconButton
          disabled={!isFormValid}
          type="plus"
          $align-c
          $flex-row
          $mh={8}
          onClick={addCoinHandler}
        />
      </Form>
      {displayResponseErrorMessage(error)}
      {loading && <Message type="info" tKey="common:message.loading.text" />}
    </Container>
  );
};

export default CoinListItemForm;
