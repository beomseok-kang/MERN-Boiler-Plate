import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  outline: none;
  border: none;
  padding: 0;
  background: none;
`;

type ButtonPresenterProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type: "button" | "submit"
}

function ButtonPresenter({
  onClick,
  children,
  type
}: ButtonPresenterProps) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default ButtonPresenter;