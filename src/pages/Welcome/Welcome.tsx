import React, {useState} from 'react';
import {Message} from '../../components';
import {Page, PageContent} from '../../layouts';
import CoinList from './CoinList/CoinList';
import {InMemoryCache, useMutation, useQuery} from '@apollo/client';
import {
  ADD_COIN,
  ADD_COIN_HOLDING,
  GET_COIN_LIST,
  GET_SYMBOLS,
  REMOVE_COIN,
  REMOVE_COIN_HOLDING,
  UPDATE_COIN_HOLDING,
} from '../../graphql/operations';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {currencies} from './CoinList/CoinListHelper';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';

const Welcome = () => {
  const {currentUser} = useAuthentication();
  const [currency, setCurrency] = useState<string>(currencies[0] as string);
  const [editMode, setEditMode] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<number | undefined>();

  const creatorId = currentUser().id;
  const getCoinListQueryVariables = {creatorId, convert: currency};
  const cacheQueryParams = {
    query: GET_COIN_LIST,
    variables: getCoinListQueryVariables,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateGetCoinListQueryCache = (cache: InMemoryCache, {data}: any) => {
    if (!data) return;

    const existingCoins = cache.readQuery(cacheQueryParams);

    cache.writeQuery({
      ...cacheQueryParams,
      data: {
        getCoinList: [existingCoins],
      },
    });
  };

  const {
    data,
    refetch,
    loading: getCoinListQueryLoading,
    error: getCoinListQueryError,
  } = useQuery(GET_COIN_LIST, {
    errorPolicy: 'all',
    variables: getCoinListQueryVariables,
  });

  const {
    data: getSymbolsQueryData,
    loading: getSymbolsLoading,
    error: getSymbolsError,
  } = useQuery(GET_SYMBOLS, {
    // fetchPolicy: 'cache-first',
    skip: getCoinListQueryLoading || !data?.getCoinList,
  });

  const [addCoin, {loading: addCoinLoading, error: addCoinError}] = useMutation(
    ADD_COIN,
    {
      errorPolicy: 'all',
      update: updateGetCoinListQueryCache,
    },
  );

  const [removeCoin, {loading: removeCoinLoading, error: removeCoinError}] =
    useMutation(REMOVE_COIN, {
      update: updateGetCoinListQueryCache,
    });

  const [
    addCoinHolding,
    {loading: addCoinHoldingLoading, error: addCoinHoldingError},
  ] = useMutation(ADD_COIN_HOLDING);

  const [
    updateCoinHolding,
    {loading: updateCoinHoldingLoading, error: updateCoinHoldingError},
  ] = useMutation(UPDATE_COIN_HOLDING, {
    update: updateGetCoinListQueryCache,
    onCompleted: () => setEditMode(true),
  });
  const [
    removeCoinHolding,
    {loading: removeCoinHoldingLoading, error: removeCoinHoldingError},
  ] = useMutation(REMOVE_COIN_HOLDING);

  const addCoinHandler = (args: {symbol?: string; slug?: string}) => {
    addCoin({variables: {...args, creatorId}});
  };

  const removeCoinHandler = (id: string) => {
    removeCoin({variables: {id}});
  };

  const addCoinHoldingHandler = (
    id: string,
    holding: {name: string; amount: number; type: string; currency: string},
  ) => {
    addCoinHolding({variables: {id, holding}});
  };
  const updateCoinHoldingHandler = (
    holdingId: string,
    holding: {amount?: number; name?: string; type?: string},
  ) => {
    updateCoinHolding({variables: {holdingId, holding}});
  };

  const removeCoinHoldingHandler = (holdingId: string) => {
    removeCoinHolding({variables: {holdingId}});
  };

  const changeCurrencyHandler = (value: string) => {
    setCurrency(value);
    refetch({convert: value});
  };

  const toggleEditHandler = (args: boolean) => setEditMode(args);

  const coinListData = data?.getCoinList ?? {balance: 0, coins: []};
  const {getSymbols: symbols = []} = getSymbolsQueryData ?? {};

  const error =
    getCoinListQueryError ||
    getSymbolsError ||
    addCoinError ||
    removeCoinError ||
    addCoinHoldingError ||
    updateCoinHoldingError ||
    removeCoinHoldingError;

  return (
    <Page name="welcome">
      <PageContent isAuthorised titleTKey="welcome:title">
        {(getCoinListQueryLoading ||
          getSymbolsLoading ||
          removeCoinLoading ||
          addCoinLoading ||
          addCoinHoldingLoading ||
          updateCoinHoldingLoading ||
          removeCoinHoldingLoading) && (
          <Message type="info" tKey="common:message.loading.text" />
        )}
        {displayResponseErrorMessage(error)}

        <CoinList
          data={coinListData}
          onAddCoin={addCoinHandler}
          onRemoveCoin={removeCoinHandler}
          onAddCoinHolding={addCoinHoldingHandler}
          onUpdateCoinHolding={updateCoinHoldingHandler}
          onRemoveCoinHolding={removeCoinHoldingHandler}
          onToggleEditMode={toggleEditHandler}
          onChangeCurrency={changeCurrencyHandler}
          editMode={editMode}
          convert={currency}
          symbols={symbols}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </PageContent>
    </Page>
  );
};

export default Welcome;
