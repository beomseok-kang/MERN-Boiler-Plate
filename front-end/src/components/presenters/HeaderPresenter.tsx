import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`

`;

type HeaderPresenterProps = {
  children: React.ReactNode;
}

function HeaderPresenter({
  children
}: HeaderPresenterProps) {
  return (
    <StyledHeader>
      {children}
    </StyledHeader>
  );
}

export default HeaderPresenter;