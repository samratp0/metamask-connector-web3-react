import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
	return (
		<StyledSpinner>
			<div className="spinner-container">
				<div className="loading-spinner"></div>
			</div>
		</StyledSpinner>
	);
};

export default Spinner;

// styles

const StyledSpinner = styled.div`
	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	.loading-spinner {
		width: 30px;
		height: 30px;
		border: 5px solid ${(props) => props.theme.primary};
		border-top: 5px solid #dfdfdf;
		border-radius: 50%;
		animation: spinner 1.5s linear infinite;
	}
`;
