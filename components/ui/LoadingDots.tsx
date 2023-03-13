import React from 'react';
import styled from 'styled-components';

const LoadingDots = () => {
	return <StyledLoadingDots></StyledLoadingDots>;
};

export default LoadingDots;

// styles

const StyledLoadingDots = styled.div`
	@keyframes ellipsis {
		to {
			width: 2rem;
		}
	}
	font-size: 2rem;

	:after {
		overflow: hidden;
		display: inline-block;
		vertical-align: bottom;
		animation: ellipsis steps(3, end) 900ms infinite;
		content: '\\2026';
		width: 0px;
		color: ${(props) => props.theme.text};
	}
`;
