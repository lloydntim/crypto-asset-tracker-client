import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<T extends {[key: string]: unknown}, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | {[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: {input: string; output: string};
  String: {input: string; output: string};
  Boolean: {input: boolean; output: boolean};
  Int: {input: number; output: number};
  Float: {input: number; output: number};
  Date: {input: any; output: any};
};

export type Auth = {
  __typename?: 'Auth';
  info?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Coin = {
  __typename?: 'Coin';
  coinId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  holdings: Array<Holding>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CoinList = {
  __typename?: 'CoinList';
  balance?: Maybe<Scalars['Float']['output']>;
  coins?: Maybe<Array<Maybe<CoinListItem>>>;
};

export type CoinListItem = {
  __typename?: 'CoinListItem';
  coinId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  creatorId?: Maybe<Scalars['ID']['output']>;
  holdingStorages?: Maybe<Array<Maybe<HoldingStorage>>>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type CoinListing = {
  __typename?: 'CoinListing';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type Exchange = {
  __typename?: 'Exchange';
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Holding = {
  __typename?: 'Holding';
  amount?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Scalars['String']['output']>;
  holdingId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['ID']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type HoldingInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type HoldingStorage = {
  __typename?: 'HoldingStorage';
  holdings?: Maybe<Array<Maybe<Holding>>>;
  total?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum HoldingStorageType {
  Exchange = 'EXCHANGE',
  Staking = 'STAKING',
  Wallet = 'WALLET',
}

export type Mutation = {
  __typename?: 'Mutation';
  addCoin?: Maybe<Coin>;
  addCoinHolding?: Maybe<Coin>;
  createPasswordToken?: Maybe<Auth>;
  login?: Maybe<Auth>;
  register?: Maybe<Auth>;
  removeCoin?: Maybe<Coin>;
  removeCoinHolding?: Maybe<Coin>;
  removeUser?: Maybe<User>;
  resendVerificationToken?: Maybe<Auth>;
  updateCoin?: Maybe<Coin>;
  updateCoinHolding?: Maybe<Coin>;
  updatePassword?: Maybe<Auth>;
  updateUser?: Maybe<User>;
  verify?: Maybe<Auth>;
};

export type MutationAddCoinArgs = {
  creatorId: Scalars['ID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type MutationAddCoinHoldingArgs = {
  holding?: InputMaybe<HoldingInput>;
  id: Scalars['ID']['input'];
};

export type MutationCreatePasswordTokenArgs = {
  username?: InputMaybe<Scalars['String']['input']>;
};

export type MutationLoginArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type MutationRegisterArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type MutationRemoveCoinArgs = {
  creatorId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationRemoveCoinHoldingArgs = {
  holdingId: Scalars['ID']['input'];
};

export type MutationRemoveUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type MutationResendVerificationTokenArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateCoinArgs = {
  holdings?: InputMaybe<HoldingInput>;
  id: Scalars['ID']['input'];
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateCoinHoldingArgs = {
  holding?: InputMaybe<HoldingInput>;
  holdingId: Scalars['ID']['input'];
};

export type MutationUpdatePasswordArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type MutationVerifyArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getCoin?: Maybe<Coin>;
  getCoinList?: Maybe<CoinList>;
  getCoinListings?: Maybe<Array<Maybe<CoinListing>>>;
  getCoins?: Maybe<Array<Maybe<Coin>>>;
  getExchanges?: Maybe<Array<Maybe<Exchange>>>;
  getPasswordToken?: Maybe<Auth>;
  getSymbols?: Maybe<Array<Maybe<Symbol>>>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};

export type QueryGetCoinArgs = {
  coinId: Scalars['ID']['input'];
};

export type QueryGetCoinListArgs = {
  convert?: InputMaybe<Scalars['String']['input']>;
  creatorId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryGetCoinListingsArgs = {
  convert?: InputMaybe<Scalars['String']['input']>;
  symbols?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetCoinsArgs = {
  creatorId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryGetPasswordTokenArgs = {
  resetPasswordToken?: InputMaybe<Scalars['String']['input']>;
};

export type QueryGetUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type Symbol = {
  __typename?: 'Symbol';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isVerified?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export const LoginDocument = gql`
  mutation Login($username: String, $password: String) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($username: String, $email: String, $password: String) {
    register(username: $username, email: $email, password: $password) {
      token
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const CreatePasswordTokenDocument = gql`
  mutation CreatePasswordToken($username: String) {
    createPasswordToken(username: $username) {
      message
    }
  }
`;
export type CreatePasswordTokenMutationFn = Apollo.MutationFunction<
  CreatePasswordTokenMutation,
  CreatePasswordTokenMutationVariables
>;

/**
 * __useCreatePasswordTokenMutation__
 *
 * To run a mutation, you first call `useCreatePasswordTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePasswordTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPasswordTokenMutation, { data, loading, error }] = useCreatePasswordTokenMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreatePasswordTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePasswordTokenMutation,
    CreatePasswordTokenMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    CreatePasswordTokenMutation,
    CreatePasswordTokenMutationVariables
  >(CreatePasswordTokenDocument, options);
}
export type CreatePasswordTokenMutationHookResult = ReturnType<
  typeof useCreatePasswordTokenMutation
>;
export type CreatePasswordTokenMutationResult =
  Apollo.MutationResult<CreatePasswordTokenMutation>;
export type CreatePasswordTokenMutationOptions = Apollo.BaseMutationOptions<
  CreatePasswordTokenMutation,
  CreatePasswordTokenMutationVariables
>;
export const GetPasswordTokenDocument = gql`
  query GetPasswordToken($resetPasswordToken: String) {
    getPasswordToken(resetPasswordToken: $resetPasswordToken) {
      token
    }
  }
`;

/**
 * __useGetPasswordTokenQuery__
 *
 * To run a query within a React component, call `useGetPasswordTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPasswordTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPasswordTokenQuery({
 *   variables: {
 *      resetPasswordToken: // value for 'resetPasswordToken'
 *   },
 * });
 */
export function useGetPasswordTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPasswordTokenQuery,
    GetPasswordTokenQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetPasswordTokenQuery, GetPasswordTokenQueryVariables>(
    GetPasswordTokenDocument,
    options,
  );
}
export function useGetPasswordTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPasswordTokenQuery,
    GetPasswordTokenQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    GetPasswordTokenQuery,
    GetPasswordTokenQueryVariables
  >(GetPasswordTokenDocument, options);
}
export type GetPasswordTokenQueryHookResult = ReturnType<
  typeof useGetPasswordTokenQuery
>;
export type GetPasswordTokenLazyQueryHookResult = ReturnType<
  typeof useGetPasswordTokenLazyQuery
>;
export type GetPasswordTokenQueryResult = Apollo.QueryResult<
  GetPasswordTokenQuery,
  GetPasswordTokenQueryVariables
>;
export const UpdatePasswordDocument = gql`
  mutation UpdatePassword($resetPasswordToken: String, $password: String) {
    updatePassword(
      resetPasswordToken: $resetPasswordToken
      password: $password
    ) {
      token
    }
  }
`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      resetPasswordToken: // value for 'resetPasswordToken'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUpdatePasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >(UpdatePasswordDocument, options);
}
export type UpdatePasswordMutationHookResult = ReturnType<
  typeof useUpdatePasswordMutation
>;
export type UpdatePasswordMutationResult =
  Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables
>;
export const VerifyDocument = gql`
  mutation Verify($token: String) {
    verify(token: $token) {
      token
    }
  }
`;
export type VerifyMutationFn = Apollo.MutationFunction<
  VerifyMutation,
  VerifyMutationVariables
>;

/**
 * __useVerifyMutation__
 *
 * To run a mutation, you first call `useVerifyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyMutation, { data, loading, error }] = useVerifyMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyMutation,
    VerifyMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<VerifyMutation, VerifyMutationVariables>(
    VerifyDocument,
    options,
  );
}
export type VerifyMutationHookResult = ReturnType<typeof useVerifyMutation>;
export type VerifyMutationResult = Apollo.MutationResult<VerifyMutation>;
export type VerifyMutationOptions = Apollo.BaseMutationOptions<
  VerifyMutation,
  VerifyMutationVariables
>;
export const GetCoinListDocument = gql`
  query GetCoinList($creatorId: ID, $convert: String) {
    getCoinList(creatorId: $creatorId, convert: $convert) {
      coins {
        id
        coinId
        price
        name
        symbol
        total
        value
        creatorId
        holdingStorages {
          type
          total
          holdings {
            id
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

/**
 * __useGetCoinListQuery__
 *
 * To run a query within a React component, call `useGetCoinListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoinListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoinListQuery({
 *   variables: {
 *      creatorId: // value for 'creatorId'
 *      convert: // value for 'convert'
 *   },
 * });
 */
export function useGetCoinListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCoinListQuery,
    GetCoinListQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetCoinListQuery, GetCoinListQueryVariables>(
    GetCoinListDocument,
    options,
  );
}
export function useGetCoinListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCoinListQuery,
    GetCoinListQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetCoinListQuery, GetCoinListQueryVariables>(
    GetCoinListDocument,
    options,
  );
}
export type GetCoinListQueryHookResult = ReturnType<typeof useGetCoinListQuery>;
export type GetCoinListLazyQueryHookResult = ReturnType<
  typeof useGetCoinListLazyQuery
>;
export type GetCoinListQueryResult = Apollo.QueryResult<
  GetCoinListQuery,
  GetCoinListQueryVariables
>;
export const GetSymbolsDocument = gql`
  query GetSymbols {
    getSymbols {
      name
      id
    }
  }
`;

/**
 * __useGetSymbolsQuery__
 *
 * To run a query within a React component, call `useGetSymbolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSymbolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSymbolsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSymbolsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSymbolsQuery,
    GetSymbolsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetSymbolsQuery, GetSymbolsQueryVariables>(
    GetSymbolsDocument,
    options,
  );
}
export function useGetSymbolsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSymbolsQuery,
    GetSymbolsQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetSymbolsQuery, GetSymbolsQueryVariables>(
    GetSymbolsDocument,
    options,
  );
}
export type GetSymbolsQueryHookResult = ReturnType<typeof useGetSymbolsQuery>;
export type GetSymbolsLazyQueryHookResult = ReturnType<
  typeof useGetSymbolsLazyQuery
>;
export type GetSymbolsQueryResult = Apollo.QueryResult<
  GetSymbolsQuery,
  GetSymbolsQueryVariables
>;
export const AddCoinDocument = gql`
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
export type AddCoinMutationFn = Apollo.MutationFunction<
  AddCoinMutation,
  AddCoinMutationVariables
>;

/**
 * __useAddCoinMutation__
 *
 * To run a mutation, you first call `useAddCoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCoinMutation, { data, loading, error }] = useAddCoinMutation({
 *   variables: {
 *      symbol: // value for 'symbol'
 *      slug: // value for 'slug'
 *      creatorId: // value for 'creatorId'
 *   },
 * });
 */
export function useAddCoinMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCoinMutation,
    AddCoinMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<AddCoinMutation, AddCoinMutationVariables>(
    AddCoinDocument,
    options,
  );
}
export type AddCoinMutationHookResult = ReturnType<typeof useAddCoinMutation>;
export type AddCoinMutationResult = Apollo.MutationResult<AddCoinMutation>;
export type AddCoinMutationOptions = Apollo.BaseMutationOptions<
  AddCoinMutation,
  AddCoinMutationVariables
>;
export const RemoveCoinDocument = gql`
  mutation RemoveCoin($id: ID, $creatorId: ID) {
    removeCoin(id: $id, creatorId: $creatorId) {
      creatorId
      id
      name
    }
  }
`;
export type RemoveCoinMutationFn = Apollo.MutationFunction<
  RemoveCoinMutation,
  RemoveCoinMutationVariables
>;

/**
 * __useRemoveCoinMutation__
 *
 * To run a mutation, you first call `useRemoveCoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCoinMutation, { data, loading, error }] = useRemoveCoinMutation({
 *   variables: {
 *      id: // value for 'id'
 *      creatorId: // value for 'creatorId'
 *   },
 * });
 */
export function useRemoveCoinMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCoinMutation,
    RemoveCoinMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RemoveCoinMutation, RemoveCoinMutationVariables>(
    RemoveCoinDocument,
    options,
  );
}
export type RemoveCoinMutationHookResult = ReturnType<
  typeof useRemoveCoinMutation
>;
export type RemoveCoinMutationResult =
  Apollo.MutationResult<RemoveCoinMutation>;
export type RemoveCoinMutationOptions = Apollo.BaseMutationOptions<
  RemoveCoinMutation,
  RemoveCoinMutationVariables
>;
export const AddCoinHoldingDocument = gql`
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
export type AddCoinHoldingMutationFn = Apollo.MutationFunction<
  AddCoinHoldingMutation,
  AddCoinHoldingMutationVariables
>;

/**
 * __useAddCoinHoldingMutation__
 *
 * To run a mutation, you first call `useAddCoinHoldingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCoinHoldingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCoinHoldingMutation, { data, loading, error }] = useAddCoinHoldingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      holding: // value for 'holding'
 *   },
 * });
 */
export function useAddCoinHoldingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddCoinHoldingMutation,
    AddCoinHoldingMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    AddCoinHoldingMutation,
    AddCoinHoldingMutationVariables
  >(AddCoinHoldingDocument, options);
}
export type AddCoinHoldingMutationHookResult = ReturnType<
  typeof useAddCoinHoldingMutation
>;
export type AddCoinHoldingMutationResult =
  Apollo.MutationResult<AddCoinHoldingMutation>;
export type AddCoinHoldingMutationOptions = Apollo.BaseMutationOptions<
  AddCoinHoldingMutation,
  AddCoinHoldingMutationVariables
>;
export const UpdateCoinHoldingDocument = gql`
  mutation updateCoinHolding($holdingId: ID!, $holding: HoldingInput) {
    updateCoinHolding(holdingId: $holdingId, holding: $holding) {
      id
      symbol
      coinId
      holdings {
        name
        id
        amount
      }
    }
  }
`;
export type UpdateCoinHoldingMutationFn = Apollo.MutationFunction<
  UpdateCoinHoldingMutation,
  UpdateCoinHoldingMutationVariables
>;

/**
 * __useUpdateCoinHoldingMutation__
 *
 * To run a mutation, you first call `useUpdateCoinHoldingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCoinHoldingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCoinHoldingMutation, { data, loading, error }] = useUpdateCoinHoldingMutation({
 *   variables: {
 *      holdingId: // value for 'holdingId'
 *      holding: // value for 'holding'
 *   },
 * });
 */
export function useUpdateCoinHoldingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCoinHoldingMutation,
    UpdateCoinHoldingMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    UpdateCoinHoldingMutation,
    UpdateCoinHoldingMutationVariables
  >(UpdateCoinHoldingDocument, options);
}
export type UpdateCoinHoldingMutationHookResult = ReturnType<
  typeof useUpdateCoinHoldingMutation
>;
export type UpdateCoinHoldingMutationResult =
  Apollo.MutationResult<UpdateCoinHoldingMutation>;
export type UpdateCoinHoldingMutationOptions = Apollo.BaseMutationOptions<
  UpdateCoinHoldingMutation,
  UpdateCoinHoldingMutationVariables
>;
export const RemoveCoinHoldingDocument = gql`
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
export type RemoveCoinHoldingMutationFn = Apollo.MutationFunction<
  RemoveCoinHoldingMutation,
  RemoveCoinHoldingMutationVariables
>;

/**
 * __useRemoveCoinHoldingMutation__
 *
 * To run a mutation, you first call `useRemoveCoinHoldingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCoinHoldingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCoinHoldingMutation, { data, loading, error }] = useRemoveCoinHoldingMutation({
 *   variables: {
 *      holdingId: // value for 'holdingId'
 *   },
 * });
 */
export function useRemoveCoinHoldingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveCoinHoldingMutation,
    RemoveCoinHoldingMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    RemoveCoinHoldingMutation,
    RemoveCoinHoldingMutationVariables
  >(RemoveCoinHoldingDocument, options);
}
export type RemoveCoinHoldingMutationHookResult = ReturnType<
  typeof useRemoveCoinHoldingMutation
>;
export type RemoveCoinHoldingMutationResult =
  Apollo.MutationResult<RemoveCoinHoldingMutation>;
export type RemoveCoinHoldingMutationOptions = Apollo.BaseMutationOptions<
  RemoveCoinHoldingMutation,
  RemoveCoinHoldingMutationVariables
>;
export const ResendVerificationTokenDocument = gql`
  mutation ResendVerificationToken($email: String, $username: String) {
    resendVerificationToken(email: $email, username: $username) {
      message
    }
  }
`;
export type ResendVerificationTokenMutationFn = Apollo.MutationFunction<
  ResendVerificationTokenMutation,
  ResendVerificationTokenMutationVariables
>;

/**
 * __useResendVerificationTokenMutation__
 *
 * To run a mutation, you first call `useResendVerificationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationTokenMutation, { data, loading, error }] = useResendVerificationTokenMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useResendVerificationTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResendVerificationTokenMutation,
    ResendVerificationTokenMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<
    ResendVerificationTokenMutation,
    ResendVerificationTokenMutationVariables
  >(ResendVerificationTokenDocument, options);
}
export type ResendVerificationTokenMutationHookResult = ReturnType<
  typeof useResendVerificationTokenMutation
>;
export type ResendVerificationTokenMutationResult =
  Apollo.MutationResult<ResendVerificationTokenMutation>;
export type ResendVerificationTokenMutationOptions = Apollo.BaseMutationOptions<
  ResendVerificationTokenMutation,
  ResendVerificationTokenMutationVariables
>;
export const GetUserDocument = gql`
  query GetUser($id: ID, $username: String, $email: String) {
    getUser(id: $id, username: $username, email: $email) {
      username
      email
      isVerified
    }
  }
`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserQuery,
    GetUserQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options,
  );
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($id: ID, $username: String, $email: String) {
    updateUser(id: $id, username: $username, email: $email) {
      username
      email
      isVerified
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options,
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const RemoveUserDocument = gql`
  mutation RemoveUser($id: ID) {
    removeUser(id: $id) {
      id
    }
  }
`;
export type RemoveUserMutationFn = Apollo.MutationFunction<
  RemoveUserMutation,
  RemoveUserMutationVariables
>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveUserMutation,
    RemoveUserMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(
    RemoveUserDocument,
    options,
  );
}
export type RemoveUserMutationHookResult = ReturnType<
  typeof useRemoveUserMutation
>;
export type RemoveUserMutationResult =
  Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<
  RemoveUserMutation,
  RemoveUserMutationVariables
>;
