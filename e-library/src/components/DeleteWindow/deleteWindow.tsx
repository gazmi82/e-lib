import React, { useState } from 'react';
import { ReactComponent as ErrorIcon } from '../../assets/svgIcons/error-svg.svg';
import { ReactComponent as DeleteIcon } from '../../assets/svgIcons/delete-svg.svg';

interface DeleteWindowProps {
  deleteFile?: any;
  deleteUser?: any;
  deleteBook?: any;
  deleteAuthor?: any;
  disabled?: boolean;
}

export const DeleteWindow: React.FunctionComponent<DeleteWindowProps> = ({
  deleteFile,
  deleteUser,
  deleteBook,
  deleteAuthor,
  disabled,
}) => {
  const [toggleWindowView, setToggleWindowView] = useState(false);

  function handleToggleWindowView() {
    setToggleWindowView(!toggleWindowView);
  }
  const handleDelete = () => {
    if (deleteFile) {
      deleteFile();
    } else if (deleteUser) {
      deleteUser();
      setToggleWindowView(!toggleWindowView);
    } else if (deleteBook) {
      deleteBook();
      setToggleWindowView(!toggleWindowView);
    } else {
      deleteAuthor();
      setToggleWindowView(!toggleWindowView);
    }
  };
  return (
    <div>
      {deleteBook ? (
        <button
          type="button"
          className="btn-delete"
          onClick={handleToggleWindowView}
        >
          Fshi Librin
        </button>
      ) : (
        <DeleteIcon className="delete-svg" onClick={handleToggleWindowView} />
      )}
      {toggleWindowView && !disabled ? (
        <div className="delete-window-container">
          <div className="delete-window-wrapper">
            <div className="delete-window-description">
              <ErrorIcon className="error-svg" />
              <span>
                {deleteFile
                  ? 'Doni te fshini kete dokument?'
                  : deleteUser
                  ? 'Jeni te sigurt qe doni te fshini kete perdorues?'
                  : deleteBook
                  ? 'Jeni te sigurt qe doni te fshini kete liber / revist?'
                  : 'Jeni te sigurt qe doni te fshini kete autore?'}
              </span>
            </div>
            <div className="delete-window-buttons">
              <button
                type="button"
                className="no-btn"
                onClick={handleToggleWindowView}
              >
                Jo
              </button>
              <button type="button" className="yes-btn" onClick={handleDelete}>
                Po
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
