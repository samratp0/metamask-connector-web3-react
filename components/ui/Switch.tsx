import React from 'react';
import styled from 'styled-components';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

interface SwitchProps {
	isOn: boolean;
	handleToggle: () => void;
}

const Switch = ({ isOn, handleToggle }: SwitchProps) => {
	return (
		<StyledSwitch>
			<input
				checked={isOn}
				onChange={handleToggle}
				className="react-switch-checkbox"
				id="reactSwitch"
				type="checkbox"
			/>
			<label
				style={{ background: isOn ? '#444ce7' : '#344054' }}
				className="react-switch-label"
				htmlFor="reactSwitch"
				tabIndex={0}
				aria-label="dark mode toggle"
				role="switch"
				aria-checked={isOn}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleToggle();
					}
				}}
			>
				<BsFillSunFill size={20} color="#fff" />
				<BsFillMoonFill size={20} color="#fff" />
				<span className="react-switch-button" />
			</label>
		</StyledSwitch>
	);
};

export default Switch;

// styles

const StyledSwitch = styled.div`
	height: 0;

	.react-switch-checkbox {
		height: 0;
		width: 0;
		visibility: hidden;
	}

	.react-switch-label {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		cursor: pointer;
		width: 50px;
		height: 27px;
		padding: 5px;
		background: grey;
		border-radius: 100px;
		position: fixed;
		top: 20px;
		right: 20px;
		transition: background-color 0.2s;
	}

	.react-switch-label .react-switch-button {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 23px;
		height: 23px;
		border-radius: 45px;
		transition: 0.2s;
		background: #fff;
		box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
	}

	.react-switch-checkbox:checked + .react-switch-label .react-switch-button {
		left: calc(100% - 2px);
		transform: translateX(-100%);
	}

	.react-switch-label:active .react-switch-button {
		width: 30px;
	}
`;
