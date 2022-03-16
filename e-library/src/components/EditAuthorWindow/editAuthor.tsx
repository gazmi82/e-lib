import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';
import NewBookForm from '../NewBookForm';
import * as yup from 'yup';
import {
  resetAuthorState,
  selectSingleAuthor,
  updateAuthor,
} from '../../redux/slices/Authors/authorsSlice';
import InputFormItem from '../InputFormItem';

interface AuthorEditProps {
  toggle: any;
}

export const AuthorEdit: React.FunctionComponent<AuthorEditProps> = ({
  toggle,
}) => {
  const author = useSelector(selectSingleAuthor);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    emriPlote: yup.string().nullable().required('Vendosni emrin e autorit'),
    ditelindja: yup
      .date()
      .nullable()
      .min('1000-01-01', 'Kontrolloni ditelindjen')
      .max(new Date(), 'Kontrolloni ditelindjen')
      .required('Vendosni ditelindjen'),
  });
  const [initialValues, setInitialValues] = useState<any>(null);

  useEffect(() => {
    dispatch(resetAuthorState());
    if (author) {
      setInitialValues(() => {
        return {
          emriPlote: author?.emriPlote,
          ditelindja: author?.ditelindja,
          id: author?.id,
        };
      });
    }
  }, [author]);

  const updateAuthors = (data: any) => {
    dispatch(updateAuthor({ data: data, id: Number(initialValues.id) }));
    toggle(false);
  };
  const handleError = () => {
    console.log('error');
  };

  return (
    <>
      {initialValues ? (
        <div className="author-edit-container">
          <div className="author-edit-wrapper">
            <div className="title">
              <h2>Modifiko Autor</h2>
            </div>
            <div className="author-details" style={{ width: '100%' }}>
              <NewBookForm
                schema={schema}
                onHandleSuccess={updateAuthors}
                onHandleError={handleError}
                initialValues={initialValues}
              >
                <div className="author-data">
                  <InputFormItem
                    name="emriPlote"
                    placeholder="Emri Plote"
                    value={initialValues.emriPlote}
                  />
                  <InputFormItem
                    name="ditelindja"
                    type="date"
                    placeholder="Ditelindja e Autorit"
                    value={initialValues.ditelindja}
                  />
                </div>
                <div className="user-edit-buttons">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => toggle(false)}
                  >
                    Anullo
                  </button>
                  <button type="submit" className="btn-primary">
                    Ruaj Ndryshimet
                  </button>
                </div>
              </NewBookForm>
            </div>
          </div>
        </div>
      ) : (
        <div className="loader">
          <Spinner className="spinner load-spin" />
        </div>
      )}
    </>
  );
};
