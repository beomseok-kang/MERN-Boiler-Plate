import React from 'react';
import styled from 'styled-components';
import { MdError } from 'react-icons/md';

const StyledDiv = styled.div`
  color: #fa5252;
`;

type ErrorMessagePresenterProps = {
  children: React.ReactNode;
};

function ErrorMessagePresenter({ children }: ErrorMessagePresenterProps) {
  return (
    <StyledDiv>
      <MdError />
      {children}
    </StyledDiv>
  );
}

export default ErrorMessagePresenter;