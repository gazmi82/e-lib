import React from 'react';

interface ButtonProps {
  type?: any;
  className?: string;
  style?: any;
  children: any;
  onClick?: any;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  type,
  className,
  children,
  style,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={'btn-primary ' + className}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
