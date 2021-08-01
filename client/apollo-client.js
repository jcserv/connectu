import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "cross-fetch";
import cookie from "js-cookie";

const httpLink = new HttpLink({ uri: `${process.env.HOST}/graphql`, fetch });

const authLink = new ApolloLink((operation, forward) => {
  const token = cookie.get("authToken");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
