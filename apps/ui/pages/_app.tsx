import { AppProps } from 'next/app';
import Head from 'next/head';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import NavBar from '../components/navbar';
import useTheme from '../components/theme';
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

	const theme = useTheme();

	return (
		<>
			<ApolloProvider client={client}>
				<Head>
					<title>Dash</title>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				</Head>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<NavBar />
					<Container maxWidth={false}>
						<Component {...pageProps} />
					</Container>
				</ThemeProvider>
			</ApolloProvider>
		</>
	);
}

export default CustomApp;
