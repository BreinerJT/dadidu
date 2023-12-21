import Head from 'next/head';
import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

import { createTheme } from '@/shared/theme/createTheme';

import '@/styles/globals.css';
import 'simplebar-react/dist/simplebar.min.css';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function App({
	Component,
	pageProps: { session, ...pageProps }
}: AppProps) {
	const theme = createTheme();

	return (
		<>
			<Head>
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>
			<SessionProvider session={session}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Component {...pageProps} />
						<Toaster position='bottom-right' gutter={8} />
					</ThemeProvider>
				</QueryClientProvider>
			</SessionProvider>
		</>
	);
}
