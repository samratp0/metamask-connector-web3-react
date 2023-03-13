import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../styles/Theme';
import 'normalize.css';

import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';
import { provider } from 'web3-core';

import { ThemeTypes } from '@/utils/types/theme.types';
import Switch from '../components/ui/Switch';

const getLibrary = (provider: provider) => {
	return new Web3(provider);
};

export default function App({ Component, pageProps }: AppProps) {
	const [theme, setTheme] = useState<ThemeTypes>('dark');

	// set theme based on last preference
	useEffect(() => {
		const userTheme = window.localStorage.getItem('userTheme');
		if (userTheme === 'light' || userTheme === 'dark') {
			setTheme(userTheme);
		}
	}, []);

	const isDarkTheme: boolean = theme === 'dark';

	const toggleTheme = () => {
		setTheme(isDarkTheme ? 'light' : 'dark');
		window.localStorage.setItem('userTheme', isDarkTheme ? 'light' : 'dark');
	};

	return (
		<>
			<Web3ReactProvider getLibrary={getLibrary}>
				<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
					<GlobalStyles />
					<Switch isOn={isDarkTheme} handleToggle={toggleTheme} />
					<Component {...pageProps} />
				</ThemeProvider>
			</Web3ReactProvider>
		</>
	);
}
