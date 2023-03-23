import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { MdTransform } from 'react-icons/md';
import Dialog from '../dialog';

const Converter = () => {
	const [nepValue, setNepValue] = useState<string>('');
	const [busdValue, setBusdValue] = useState<string>('');
	const [showDialog, setShowDialog] = useState<boolean>(false);

	const handleDialog = () => {
		setShowDialog(!showDialog);
	};

	const handleNepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if (value === '') {
			setNepValue('');
			setBusdValue('');
		} else if (Number(value)) {
			setNepValue(value);
			setBusdValue((Number(value) * 3).toFixed(2));
		}
	};

	const handleBusdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if (value === '') {
			setNepValue('');
			setBusdValue('');
		} else if (Number(value)) {
			setBusdValue(value);
			setNepValue((Number(value) / 3).toFixed(2));
		}
	};

	const handleClear = () => {
		setNepValue('');
		setBusdValue('');
	};

	return (
		<>
			<Dialog showDialog={showDialog} handleDialog={handleDialog} />
			<StyledConverter>
				<div className="title">
					<Image
						src="/favicon.ico"
						width={50}
						height={50}
						alt="Metamask Logo"
					/>
					<h1>Connect Metamask</h1>
				</div>
				<div className="form">
					<h2>Crypto converter</h2>
					<div>
						<label htmlFor="nepInput">NEP</label>
						<Input
							id="nepInput"
							placeholder="00.00"
							value={nepValue}
							handleChange={handleNepChange}
							handleClear={handleClear}
						/>
					</div>
					<MdTransform size={20} />
					<div>
						<label htmlFor="busdInput">BUSD</label>
						<Input
							id="busdInput"
							placeholder="00.00"
							value={busdValue}
							handleChange={handleBusdChange}
							handleClear={handleClear}
						/>
					</div>
					<Button
						label="Check Wallet Details"
						variant="filled"
						onClick={handleDialog}
					/>
				</div>
			</StyledConverter>
		</>
	);
};

export default Converter;

// styles

const StyledConverter = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.title {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 20px;

		h1 {
			text-transform: uppercase;
			letter-spacing: 0.2rem;
		}
	}

	.form {
		width: 55%;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 30px;
		display: flex;
		gap: 20px;
		flex-direction: column;

		@media (max-width: 767px) {
			width: 90%;
		}

		h2 {
			letter-spacing: 0.1rem;
			font-weight: 600;
			text-transform: capitalize;
		}

		label {
			display: block;
			margin-bottom: 10px;
			color: ${(props) => props.theme.grey};
		}

		svg {
			align-self: center;
		}
	}
`;
