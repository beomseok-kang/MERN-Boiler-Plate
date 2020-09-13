import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`

`;

const StyledHeading1 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

type FormPresenterProps = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  heading: string;
}

function FormPresenter({
  children,
  onSubmit,
  heading
}: FormPresenterProps) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledHeading1>
        {heading}
      </StyledHeading1>
      {children}
    </StyledForm>
  );
}

export default FormPresenter;