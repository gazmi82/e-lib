import React from 'react';

interface HeaderProps {
  children: any;
}

export const Header: React.FunctionComponent<HeaderProps> = props => {
  return <header>{props.children}</header>;
};
