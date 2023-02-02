import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import gql from 'graphql-tag';
import {setContext} from '@apollo/client/link/context';

const APOLLO_CLIENT_URI = 'http://localhost:3001/graphql';

export const createClient = () => {
  const httpLink = createHttpLink({uri: APOLLO_CLIENT_URI});

  const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};

export const LOGIN = gql`
  mutation Login($username: String, $password: String) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String, $email: String, $password: String) {
    register(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const GET_COIN_LISTINGS = gql`
  query GetCoinListings($symbols: String, $convert: String) {
    getCoinListings(symbols: $symbols, convert: $convert) {
      price
      id
      name
      symbol
    }
  }
`;
export const GET_COINS = gql`
  query GetCoins($creatorId: ID) {
    getCoins(creatorId: $creatorId) {
      symbol
      id
      creatorId
      holdings {
        amount
        id
        type
        holdingId
        name
      }
    }
  }
`;

export const ADD_COIN = gql`
  mutation AddCoin($symbol: String!, $creatorId: ID!) {
    addCoin(symbol: $symbol, creatorId: $creatorId) {
      symbol
      holdings {
        name
      }
      creatorId
      id
    }
  }
`;

export const REMOVE_COIN = gql`
  mutation RemoveCoin($id: ID!) {
    removeCoin(id: $id) {
      creatorId
      id
      name
    }
  }
`;

export const ADD_COIN_HOLDING = gql`
  mutation addCoinHolding($id: ID!, $holding: HoldingInput) {
    addCoinHolding(id: $id, holding: $holding) {
      symbol
      id
      holdings {
        name
        holdingId
        id
        currency
        type
      }
    }
  }
`;

export const UPDATE_COIN_HOLDING = gql`
  mutation updateCoinHolding($holdingId: ID!, $holding: HoldingInput) {
    updateCoinHolding(holdingId: $holdingId, holding: $holding) {
      id
      symbol
      coinId
      holdings {
        name
        id
        currency
        amount
      }
    }
  }
`;

export const REMOVE_COIN_HOLDING = gql`
  mutation removeCoinHolding($holdingId: ID!) {
    removeCoinHolding(holdingId: $holdingId) {
      id
      symbol
      coinId
      holdings {
        name
        id
        currency
      }
    }
  }
`;
