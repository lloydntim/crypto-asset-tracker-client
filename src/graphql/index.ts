import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';

export const createClient = () => {
  const httpLink = createHttpLink({
    uri: process.env.APOLLO_SERVER_URL,
  });

  const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
      graphQLErrors.forEach((graphQLError) =>
        console.log(`[GraphQL error]`, graphQLError),
      );
    if (networkError) console.log('network', networkError);
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
