import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  outline: none;
  border: none;
  padding: 0;
  margin: 0;
  border: 1px solid #BBBBBB;
`;

type InputPresenterProps = {
  type: "text" | "password";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

function InputPresenter({
  type,
  value,
  onChange,
  placeholder
}: InputPresenterProps) {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default InputPresenter;