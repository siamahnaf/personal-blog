import { useMemo } from "react";
import {
    ApolloClient,
    InMemoryCache,
    createHttpLink,
    type NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash-es/isEqual";
import { setContext } from "@apollo/client/link/context";

const COUNTRIES_API = process.env.NEXT_PUBLIC_API_URL as string

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const apolloHttpLink = createHttpLink({
    uri: COUNTRIES_API
})

const apolloAuthContext = setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS}`
        },
    }
})

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: apolloAuthContext.concat(apolloHttpLink),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState?: any) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        const existingCache = _apolloClient.cache.extract();

        const data = merge(initialState, existingCache, {
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });
        _apolloClient.cache.restore(data);
    }

    if (typeof window === 'undefined') {
        return _apolloClient;
    }

    if (!apolloClient) {
        apolloClient = _apolloClient;
    }

    return _apolloClient;
}

export function addApolloState(
    client: ApolloClient<NormalizedCacheObject>,
    pageProps: any
) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }

    return pageProps;
}

export function useApollo(pageProps: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const client = useMemo(() => initializeApollo(state), [state]);
    return client;
}