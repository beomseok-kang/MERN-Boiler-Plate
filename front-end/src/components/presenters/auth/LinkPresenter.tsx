import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

type LinkPresenterProps = {
  to: string;
  children: React.ReactNode;
}

function LinkPresenter({ to, children }: LinkPresenterProps) {
  return <StyledLink to={to}>{children}</StyledLink>
}

export default LinkPresenter;