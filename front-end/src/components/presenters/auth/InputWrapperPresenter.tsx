import React from 'react';
import styled from 'styled-components';
import { MdWarning, MdError, MdCheckCircle } from 'react-icons/md';

const StyledWrapperDiv = styled.div`
`;

const StyledHeading3 = styled.h3`
  font-size: 1rem;
  font-weight: bold;
`;

const StyledMessageDiv = styled.div`
  font-size: 1rem;
  &.warning {
    color: #fd7e14;
  }
  &.error {
    color: #fa5252;
  }
  &.fine {
    color: #51cf66;
  }
`;

type InputWrapperPresenterProps = {
  title: string;
  children: React.ReactNode;
  currentStatus: currentStatus
}

export type currentStatus = {
  message: string | null | undefined;
  status: status | null | undefined;
}

type status = "warning" | "error" | "fine";

function InputWrapperPresenter({
  title,
  children,
  currentStatus
}: InputWrapperPresenterProps) {
  const StatusIcon = (status: status) => {
    switch (status) {
      case "warning":
        return <MdWarning />
      case "error":
        return <MdError />
      case "fine":
        return <MdCheckCircle />
    }
  };

  return (
    <StyledWrapperDiv>
      <StyledHeading3>
        {title}
      </StyledHeading3>
      {children}
      {
        currentStatus.status
          ? <StyledMessageDiv className={currentStatus.status}>
            {StatusIcon(currentStatus.status)}
            {currentStatus.message}
          </StyledMessageDiv>
          : null
      }
    </StyledWrapperDiv>
  );
}

export default InputWrapperPresenter;