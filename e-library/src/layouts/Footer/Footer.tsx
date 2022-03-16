import React from 'react';

interface FooterProps {
  children: any;
}

export const Footer: React.FunctionComponent<FooterProps> = props => {
  return <footer>{props.children}</footer>;
};
