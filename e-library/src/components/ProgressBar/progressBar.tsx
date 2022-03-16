import React from 'react';
interface ProgressBarProps {
  className?: string;
  userProgress?: number;
}

export const ProgressBar: React.FunctionComponent<ProgressBarProps> = ({
  className,
  userProgress,
}) => {
  return (
    <div
      className={`progress-bar-container ${className}`}
      style={{
        width: `${userProgress}%`,
      }}
    ></div>
  );
};
