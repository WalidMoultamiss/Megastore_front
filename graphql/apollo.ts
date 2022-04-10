import { ApolloClient, InMemoryCache } from "@apollo/client";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient} from "graphql-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import WebSocket from 'ws';

const httpLink = new HttpLink({
  uri: "http://localhost:4000/gql",
});


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  httpLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default apolloClient;
