import React from 'react';
import styled from 'styled-components';
import { RxCrossCircled } from 'react-icons/rx';

interface InputProps {
	id: string;
	value?: string;
	placeholder?: string;
	handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleClear?: () => void;
}

const Input = ({
	id,
	placeholder,
	value,
	handleChange,
	handleClear,
}: InputProps) => {
	return (
		<StyledInput>
			<input
				type="text"
				aria-label={`${id} field`}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
			{value && value?.length > 0 && (
				<div
					className="input-icon"
					tabIndex={0}
					role="button"
					aria-label={`clear ${id}`}
					aria-pressed="false"
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleClear?.();
						}
					}}
					onClick={() => {
						handleClear?.();
					}}
				>
					<RxCrossCircled size={20} />
				</div>
			)}
		</StyledInput>
	);
};

export default Input;

// styles

const StyledInput = styled.div`
	display: flex;
	gap: 5px;
	align-items: center;

	input {
		position: relative;
		border: none;
		padding: 0.85rem 1rem;
		width: 100%;
		border-radius: 0.3rem;
		border: 2px solid ${(props) => props.theme.grey};
	}

	.input-icon {
		position: absolute;
		right: 50px;
		color: ${(props) => props.theme.black};
	}
`;
