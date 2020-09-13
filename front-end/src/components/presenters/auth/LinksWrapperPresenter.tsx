import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

type LinksWrapperPresenterProps = {
  children: React.ReactNode;
}

function LinksWrapperPresenter({ children }: LinksWrapperPresenterProps) {
  return (
    <StyledDiv>
      {children}
    </StyledDiv>
  );
}

export default LinksWrapperPresenter;