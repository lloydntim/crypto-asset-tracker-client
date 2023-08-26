import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import gql from 'graphql-tag';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';

export const createClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.APOLLO_SERVER_URL,
  });

  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({message, locations, path}) =>
        console.log(
          'message',
          message,
          // `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError) console.log('network', networkError);
    // if (networkError) console.log(`[Network error]: ${networkError}`);
  });

  const authLink = setContext(
    (_, {headers}: {headers: {authorization: string}}) => {
      const token = localStorage.getItem('token');

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
          cookies: document.cookie ?? '',
        },
      };
    },
  );

  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
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

export const CREATE_PASSWORD_TOKEN = gql`
  mutation CreatePasswordToken($username: String) {
    createPasswordToken(username: $username) {
      message
    }
  }
`;

export const GET_PASSWORD_TOKEN = gql`
  query GetPasswordToken($resetPasswordToken: String) {
    getPasswordToken(resetPasswordToken: $resetPasswordToken) {
      token
    }
  }
`;

export const UPDATE_PASSWORD_TOKEN = gql`
  mutation UpdatePassword($resetPasswordToken: String, $password: String) {
    updatePassword(
      resetPasswordToken: $resetPasswordToken
      password: $password
    ) {
      token
    }
  }
`;

export const VERIFY = gql`
  mutation Verify($token: String) {
    verify(token: $token) {
      token
    }
  }
`;

export const GET_COIN_LIST = gql`
  query GetCoinList($creatorId: ID, $convert: String) {
    getCoinList(creatorId: $creatorId, convert: $convert) {
      coins {
        id
        coinId
        name
        symbol
        total
        value
        storageOptions {
          type
          total
          holdings {
            amount
            name
            value
          }
        }
      }
      balance
    }
  }
`;

export const GET_SYMBOLS = gql`
  query GetSymbols {
    getSymbols {
      name
      id
    }
  }
`;

export const ADD_COIN = gql`
  mutation AddCoin($symbol: String, $slug: String, $creatorId: ID!) {
    addCoin(symbol: $symbol, slug: $slug, creatorId: $creatorId) {
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
  mutation RemoveCoin($id: ID, $creatorId: ID) {
    removeCoin(id: $id, creatorId: $creatorId) {
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

export const RESEND_VERIFICATION_TOKEN = gql`
  mutation ResendVerificationToken($email: String, $username: String) {
    resendVerificationToken(email: $email, username: $username) {
      message
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID, $username: String, $email: String) {
    getUser(id: $id, username: $username, email: $email) {
      username
      email
      isVerified
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID, $username: String, $email: String) {
    updateUser(id: $id, username: $username, email: $email) {
      username
      email
      isVerified
    }
  }
`;

export const REMOVE_USER = gql`
  mutation RemoveUser($id: ID) {
    removeUser(id: $id) {
      id
    }
  }
`;
