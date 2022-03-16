import React, { useRef } from 'react';

const useFocus = () => {
  const htmlElRef = useRef<any>(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus as any];
};

export default useFocus;
