import React from 'react';
import { ReactComponent as ErrorIcon } from '../../assets/svgIcons/error-svg.svg';

interface EditWindowProps {
  updateFile: any;
  disabled?: boolean;
  toggle: any;
}

export const EditWindow: React.FunctionComponent<EditWindowProps> = ({
  updateFile,
  disabled,
  toggle,
}) => {
  return (
    <div>
      {toggle && !disabled ? (
        <div className="edit-window-container">
          <div className="edit-window-wrapper">
            <div className="edit-window-description">
              <ErrorIcon className="error-svg" />
              <span>Doni te ndryshoni kete dokument?</span>
            </div>
            <div className="edit-window-buttons">
              <button
                type="button"
                className="no-btn"
                onClick={() => toggle(false)}
              >
                Jo
              </button>
              <button type="button" className="yes-btn" onClick={updateFile}>
                Po
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
