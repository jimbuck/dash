import { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './styles.css';

const client = new ApolloClient({
	uri: 'http://localhost:3333/graphql',
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
	},
});

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<ApolloProvider client={client}>
				<Head>
					<title>Dash</title>
				</Head>
				<div className="app">
					<main>
						<Component {...pageProps} />
					</main>
				</div>
			</ApolloProvider>
		</>
	);
}

export default CustomApp;
