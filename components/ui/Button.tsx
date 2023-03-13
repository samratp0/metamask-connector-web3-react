import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

interface ButtonProps {
	label: string;
	variant: 'outlined' | 'filled';
	onClick: () => void;
	loading?: boolean;
	type?: 'error';
}

const Button = ({ label, variant, onClick, loading, type }: ButtonProps) => {
	return (
		<StyledButton>
			<button
				onClick={onClick}
				className={`${variant} ${type} ${loading && 'loading'}`}
			>
				{loading ? <Spinner /> : label}
			</button>
		</StyledButton>
	);
};

export default Button;

// styles

const StyledButton = styled.div`
	width: 100%;
	button {
		border: none;
		padding: 1rem 1.25rem;
		margin-top: 1rem;
		font-size: 1rem;
		width: 100%;
		height: 65px;
		border-radius: 0.3rem;
		color: ${(props) => props.theme.white};
		background: ${(props) => props.theme.primary};

		&:focus {
			outline: 1px solid ${(props) => props.theme.text};
			outline-offset: 2px;
		}

		&:hover {
			cursor: pointer;
			opacity: 0.8;
		}
	}

	button.error {
		background: #e8230c;
		color: #e8230c;
	}

	button.outlined {
		border: 2px solid ${(props) => props.theme.primary};
		color: ${(props) => props.theme.text};
		background: none;
	}

	button.outlined.error {
		border: 2px solid #e8230c;
	}

	button.loading {
		transition: 0.3s;
		width: 65px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		border-radius: 50%;
	}
`;
