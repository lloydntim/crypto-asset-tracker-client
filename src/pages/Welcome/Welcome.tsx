import React, {FC, ReactElement, useMemo, useState} from 'react';
import {useForm} from '../../hooks';
import {
  Header,
  Body,
  Input,
  Headline,
  Footer,
  Message,
  Box,
  Select,
} from '../../components';
import {Page} from '../../layouts';
import CoinList, {CoinData} from './CoinList/CoinList';
import {useMutation, useQuery} from '@apollo/client';
import {
  ADD_COIN,
  ADD_COIN_HOLDING,
  GET_COINS,
  GET_COIN_LISTINGS,
  REMOVE_COIN,
  REMOVE_COIN_HOLDING,
  UPDATE_COIN_HOLDING,
} from '../../graphql';
import {useAuthentication} from '../../providers/AuthenticationProvider';

const currencies = [
  {text: 'USD', value: 'USD'},
  {text: 'GBP', value: 'GBP'},
  {text: 'EUR', value: 'EUR'},
];

const Welcome: FC = (): ReactElement => {
  const {currentUser} = useAuthentication();
  const [currency, setCurrency] = useState(currencies[0].value);
  const [editMode, setEditMode] = useState(false);

  const {
    data: coins,
    loading: getCoinsLoading,
    error: getCoinsError,
  } = useQuery(GET_COINS, {variables: {creatorId: currentUser()?.id || ''}});

  // Gets symbols from coin list and concatinates them
  const symbols = coins?.getCoins
    .map((coin: {symbol: string}) => coin.symbol)
    .join(',');

  const {
    data: coinListings,
    refetch,
    loading,
    error: coinListingsError,
  } = useQuery(GET_COIN_LISTINGS, {
    variables: {
      symbols,
      convert: currency,
    },
  });

  const coinListData: {coins: CoinData[]} = useMemo(() => {
    const processedData = coins?.getCoins.map((coin: CoinData) => {
      const listing = coinListings?.getCoinListings.find(
        (listing: CoinData) => listing.symbol === coin.symbol,
      );

      const {price, id: coinId, name} = listing ?? {};

      return {...coin, price, coinId, name};
    });
    return {
      coins: processedData,
    };
  }, [coins, coinListings]);

  const [addCoin, {loading: addCoinLoading, error: addCoinError}] = useMutation(
    ADD_COIN,
    {
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

  const [
    removeCoin,
    {loading: removeCoinLoading, error: removeCoinError},
  ] = useMutation(REMOVE_COIN, {
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
  ] = useMutation(UPDATE_COIN_HOLDING);

  const [
    removeCoinHolding,
    {loading: removeCoinHoldingLoading, error: removeCoinHoldingError},
  ] = useMutation(REMOVE_COIN_HOLDING);

  const addCoinHandler = (symbol: string) => {
    addCoin({variables: {symbol, creatorId: currentUser()?.id}});
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

  if (
    loading ||
    addCoinLoading ||
    removeCoinLoading ||
    getCoinsLoading ||
    addCoinHoldingLoading ||
    updateCoinHoldingLoading ||
    removeCoinHoldingLoading
  )
    return <Box>Loading</Box>;

  if (addCoinHoldingError) {
    return <Box>{addCoinHoldingError.message.split(':')[1].trim()}</Box>;
  }

  if (updateCoinHoldingError) {
    return <Box>{updateCoinHoldingError.message.split(':')[1].trim()}</Box>;
  }

  if (removeCoinHoldingError) {
    return <Box>{removeCoinHoldingError.message.split(':')[1].trim()}</Box>;
  }

  if (getCoinsError) {
    return <Box>{getCoinsError.message.split(':')[1].trim()}</Box>;
  }

  if (addCoinError) {
    const user = currentUser()?.id ?? {};
    console.log('adddCoinError', addCoinError);
    // return <Box>{addCoinError.message.split(':')[1].trim()}</Box>;
    return <Box>Error</Box>;
  }

  if (removeCoinError) {
    return <Box>{removeCoinError.message.split(':')[1].trim()}</Box>;
  }

  if (coinListingsError) {
    return <Box>{coinListingsError.message.split(':')[1]?.trim()}</Box>;
  }

  console.log('current coins', coins);
  return (
    <Page name="welcome">
      <Header />
      <Body>
        <Headline tKey="welcome:title" />

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
        />

        {loading && <Message type="info">Loading</Message>}
      </Body>
      <Footer startYear={2023} companyName="LNCD" />
    </Page>
  );
};

export default Welcome;
