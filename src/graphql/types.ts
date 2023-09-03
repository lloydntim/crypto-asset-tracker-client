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

export type CoinSymbol = {
  __typename?: 'CoinSymbol';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
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
  getCoinSymbols?: Maybe<Array<Maybe<CoinSymbol>>>;
  getCoins?: Maybe<Array<Maybe<Coin>>>;
  getExchanges?: Maybe<Array<Maybe<Exchange>>>;
  getPasswordToken?: Maybe<Auth>;
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
