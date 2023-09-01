import React, {useState} from 'react';
import {Container, List, Message} from '../../components';
import {
  Coin,
  currencyFormatMapper,
  Currency,
  currencies,
} from './CoinList/CoinListHelper';
import CoinListItem from './CoinList/CoinListItem';
import CoinListHoldingStorages, {
  CoinListHoldingStorage,
} from './CoinList/CoinListHoldingStorages';
import CoinListHolding from './CoinList/CoinListHolding';
import CoinListHeader from './CoinList/CoinListHeader';
import CoinListItemForm from './CoinList/CoinListItemForm';
import {GET_COIN_LIST} from '../../graphql/operations';
import {useQuery} from '@apollo/client';
import {useAuthentication} from '../../providers/AuthenticationProvider';
import {displayResponseErrorMessage} from '../../helpers/displayResponseErrorMessage';
import CoinListHoldingForm from './CoinList/CoinListHoldingForm';
import {Page, PageContent} from '../../layouts';

const CoinList = () => {
  const {currentUser} = useAuthentication();
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const [editMode, setEditMode] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<number>();
  const {location} = currencyFormatMapper[currency];

  const creatorId = currentUser().id;
  const getCoinListQueryVariables = {creatorId, convert: currency};

  const {
    data,
    refetch,
    loading: getCoinListQueryLoading,
    error: getCoinListQueryError,
  } = useQuery(GET_COIN_LIST, {
    errorPolicy: 'all',
    variables: getCoinListQueryVariables,
  });

  const {balance, coins: coinList} = data?.getCoinList ?? {
    balance: 0,
    coins: [],
  };

  const toggleEditHandler = (args: boolean) => setEditMode(args);
  const changeCurrencyHandler = (currency: Currency) => {
    setCurrency(currency);
    refetch({convert: currency});
  };

  /////////// TODO : and aymbol filter
  return (
    <Page name="portfolio">
      <PageContent isAuthorised titleTKey="portfolio:title">
        <Container $mv={32} $align-c>
          <CoinListHeader
            {...{
              balance,
              editMode,
              currency,
              location,
              onToggleEditMode: toggleEditHandler,
              onChangeCurrency: changeCurrencyHandler,
            }}
          />

          <CoinListItemForm
            {...{coins: coinList, currency, visible: editMode}}
          />

          <List<Coin>
            $lst-stl="none"
            $mv={8}
            $p={0}
            data={coinList}
            renderItem={({item: coin, index}) => {
              return (
                <CoinListItem
                  {...{
                    ...coin,
                    editMode,
                    currency,
                    location,
                    expanded: selectedCoin === index,
                  }}
                  onClick={() => setSelectedCoin(index)}
                >
                  <CoinListHoldingStorages
                    storages={coin.holdingStorages}
                    renderStorage={(storage, index) => {
                      return (
                        <CoinListHoldingStorage
                          {...storage}
                          location={location}
                          key={index}
                          renderHolding={(holding, index) => {
                            return (
                              <CoinListHolding
                                key={index}
                                {...{
                                  ...holding,
                                  location,
                                  editMode,
                                  currency,
                                }}
                              />
                            );
                          }}
                        />
                      );
                    }}
                  />
                  <CoinListHoldingForm coinId={coin.id} visible={editMode} />
                </CoinListItem>
              );
            }}
          />
          {displayResponseErrorMessage(getCoinListQueryError)}
          {getCoinListQueryLoading && (
            <Message type="info" tKey="common:message.loading.text" />
          )}
        </Container>
      </PageContent>
    </Page>
  );
};

export default CoinList;
