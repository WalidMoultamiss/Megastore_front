import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

console.log('😎 connect to graphql at '+process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);


export default apolloClient;