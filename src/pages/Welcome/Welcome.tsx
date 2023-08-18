import React, {useMemo, useState} from 'react';
import {
  Body,
  Headline,
  Footer,
  Message,
  Navigation,
  Header,
} from '../../components';
import {Page} from '../../layouts';
import CoinList from './CoinList/CoinList';
import {useMutation, useQuery} from '@apollo/client';
import {
  ADD_COIN,
  ADD_COIN_HOLDING,
  GET_COINS,
  GET_COIN_LISTINGS,
  GET_SYMBOLS,
  REMOVE_COIN,
  REMOVE_COIN_HOLDING,
  UPDATE_COIN_HOLDING,
} from '../../graphql';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {CoinData, currencies} from './CoinList/CoinListHelper';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';

const Welcome = () => {
  const {currentUser} = useAuthentication();
  const [currency, setCurrency] = useState<string>(currencies[0] as string);
  const [editMode, setEditMode] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<number | undefined>();

  const {
    data: coins,
    loading: getCoinsLoading,
    error: getCoinsError,
  } = useQuery(GET_COINS, {variables: {creatorId: currentUser()?.id || ''}});

  const {
    data: getSymbolsData,
    loading: getSymbolsLoading,
    error: getSymbolsError,
  } = useQuery(GET_SYMBOLS);

  const coinSymbols = getSymbolsData?.getSymbols;
  // Gets symbols from coin list and concatinates them
  const symbols = coins?.getCoins
    .map((coin: {symbol: string}) => coin.symbol)
    .join(',');

  const {
    data: coinListings,
    refetch,
    loading: coinListingLoading,
    error: coinListingsError,
  } = useQuery(GET_COIN_LISTINGS, {
    variables: {
      symbols,
      convert: currency,
    },
  });

  const coinListData: {coins: CoinData[]} = useMemo(() => {
    const processedData =
      coins?.getCoins.map((coin: CoinData) => {
        const listing = coinListings?.getCoinListings.find(
          (listing: CoinData) => listing.symbol === coin.symbol,
        );

        const {price, id: coinId, name} = listing ?? {};

        return {...coin, price, coinId, name};
      }) || [];
    return {
      coins: processedData,
    };
  }, [coins, coinListings]);

  const [addCoin, {loading: addCoinLoading, error: addCoinError}] = useMutation(
    ADD_COIN,
    {
      errorPolicy: 'all',
      update: (cache, {data}) => {
        const creatorId = currentUser()?.id ?? '';
        const newCoin = data?.addCoin ?? false;
        const existingCoins = creatorId
          ? cache.readQuery({
              query: GET_COINS,
              variables: {creatorId},
            })
          : false;
        if (newCoin && existingCoins && creatorId) {
          cache.writeQuery({
            query: GET_COINS,
            variables: {creatorId},
            data: {
              getCoins: [existingCoins],
            },
          });
        }
      },
    },
  );

  const [removeCoin, {loading: removeCoinLoading, error: removeCoinError}] =
    useMutation(REMOVE_COIN, {
      update: (cache, {data}) => {
        const creatorId = currentUser()?.id ?? '';
        const newCoin = data?.removeCoin ?? false;
        const existingCoins = creatorId
          ? cache.readQuery({
              query: GET_COINS,
              variables: {creatorId},
            })
          : false;

        if (newCoin && existingCoins && creatorId) {
          cache.writeQuery({
            query: GET_COINS,
            variables: {creatorId},
            data: {
              getCoins: [existingCoins],
            },
          });
        }
      },
    });

  const [
    addCoinHolding,
    {loading: addCoinHoldingLoading, error: addCoinHoldingError},
  ] = useMutation(ADD_COIN_HOLDING);

  const [
    updateCoinHolding,
    {loading: updateCoinHoldingLoading, error: updateCoinHoldingError},
  ] = useMutation(UPDATE_COIN_HOLDING, {onCompleted: () => setEditMode(true)});
  const [
    removeCoinHolding,
    {loading: removeCoinHoldingLoading, error: removeCoinHoldingError},
  ] = useMutation(REMOVE_COIN_HOLDING);

  const addCoinHandler = (args: {symbol?: string; slug?: string}) => {
    addCoin({variables: {...args, creatorId: currentUser()?.id}});
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

  return (
    <Page name="welcome">
      <Header>
        <Navigation />
      </Header>

      <Body>
        <Headline tKey="welcome:title" />

        {(getCoinsLoading ||
          getSymbolsLoading ||
          coinListingLoading ||
          removeCoinLoading ||
          addCoinLoading ||
          addCoinHoldingLoading ||
          updateCoinHoldingLoading ||
          removeCoinHoldingLoading) && (
          <Message type="info" tKey="common:message.loading.text" />
        )}

        {displayResponseErrorMessage(getCoinsError)}
        {displayResponseErrorMessage(getSymbolsError)}
        {displayResponseErrorMessage(addCoinError)}
        {displayResponseErrorMessage(removeCoinError)}
        {displayResponseErrorMessage(coinListingsError)}
        {displayResponseErrorMessage(addCoinHoldingError)}
        {displayResponseErrorMessage(updateCoinHoldingError)}
        {displayResponseErrorMessage(removeCoinHoldingError)}

        <CoinList
          data={coinListData}
          onChange={() => console.log('test')}
          onAddCoin={addCoinHandler}
          onRemoveCoin={removeCoinHandler}
          onAddCoinHolding={addCoinHoldingHandler}
          onUpdateCoinHolding={updateCoinHoldingHandler}
          onRemoveCoinHolding={removeCoinHoldingHandler}
          onToggleEditMode={(args: boolean) => setEditMode(args)}
          onChangeCurrency={(value: string) => {
            setCurrency(value);
            refetch({convert: value});
          }}
          editMode={editMode}
          convert={currency}
          symbols={coinSymbols}
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
        />
      </Body>
      <Footer startYear={2023} companyName="LNCD" />
    </Page>
  );
};

export default Welcome;
