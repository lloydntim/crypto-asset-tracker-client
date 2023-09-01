import React, {useState} from 'react';
import {
  Container,
  IconButton,
  Input,
  Form,
  Select,
  Message,
} from '../../../components';
import {CoinSymbol, NewCoinOptions, coinSelectOptions} from './CoinListHelper';
import {useForm} from '../../../hooks';
import {InMemoryCache, useMutation, useQuery} from '@apollo/client';
import {
  ADD_COIN,
  GET_COIN_LIST,
  GET_SYMBOLS,
} from '../../../graphql/operations';
import {useAuthentication} from '../../../providers/AuthenticationProvider';
import {displayResponseErrorMessage} from '../../../helpers/displayResponseErrorMessage';
import {slugify} from '../../../utils';

interface CoinListItemFormProps {
  visible: boolean;
  currency: string;
}

const CoinListItemForm = ({visible, currency}: CoinListItemFormProps) => {
  const {currentUser} = useAuthentication();
  const creatorId = currentUser().id;
  const getCoinListQueryVariables = {creatorId, convert: currency};
  const cacheQueryParams = {
    query: GET_COIN_LIST,
    variables: getCoinListQueryVariables,
  };

  const {
    form: {newCoin},
    formFieldChangeHandler,
  } = useForm('newCoin*');

  const [coinSelectOption, setCoinSelectOption] = useState(
    coinSelectOptions[0].value,
  );

  const {
    data: getSymbolsQueryData,
    loading: getSymbolsQueryLoading,
    error: getSymbolsQueryError,
  } = useQuery(GET_SYMBOLS);

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

  const {getSymbols: symbols = []} = getSymbolsQueryData ?? {};

  const loading = getSymbolsQueryLoading || addCoinMutationLoading;
  const error = getSymbolsQueryError || addCoinMutationError;
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
      formFieldChangeHandler({name: 'newCoin', value: ''});
    }
  };

  if (!visible) return null;

  return (
    <Container $flex-col $align-m>
      <Form $ph={8} $pt={12} $flex-row $w="100%" $align-t>
        <Select
          $mh={8}
          options={coinSelectOptions}
          onChange={(value) => setCoinSelectOption(value)}
        />

        <Input
          $mh={8}
          name={newCoin.name}
          value={newCoin.value}
          required={newCoin.required}
          onChange={formFieldChangeHandler}
          {...(isPresetSelected && {
            dataList: symbols?.map(({id: value, name: text}: CoinSymbol) => ({
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
          onClick={addCoinHandler}
        />
      </Form>
      {displayResponseErrorMessage(error)}
      {loading && <Message type="info" tKey="common:message.loading.text" />}
    </Container>
  );
};

export default CoinListItemForm;
