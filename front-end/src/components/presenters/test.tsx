import React from 'react';

type TestComponentProps = {
  onClick: () => void;
  children: React.ReactNode
}

function TestComponent({ onClick, children }: TestComponentProps) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

export default TestComponent;