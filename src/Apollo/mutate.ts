import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const apolloAuthContext = setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS}`
        },
    }
})

const apolloHttpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_MUTATE_URL as string
})

export const client = new ApolloClient({
    link: apolloAuthContext.concat(apolloHttpLink),
    cache: new InMemoryCache(),
});