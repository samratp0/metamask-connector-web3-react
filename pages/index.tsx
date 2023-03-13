import Head from 'next/head';
import Image from 'next/image';
import Converter from '@/components/converter';
import styled from 'styled-components';

export default function Home() {
	return (
		<>
			<Head>
				<title>Neptune Mutual Assignment</title>
				<meta name="description" content="Built by Samrat" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<StyledMain>
				<Converter />
			</StyledMain>
		</>
	);
}

// styles

const StyledMain = styled.main`
	height: 100vh;
	width: 100vw;
`;
