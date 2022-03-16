import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';
import NewBookForm from '../NewBookForm';
import * as yup from 'yup';
import InputFormItem from '../InputFormItem';
import { createAuthor } from '../../redux/slices/Authors/authorsSlice';

interface CreateAuthorProps {
  toggle: any;
}

export const CreateAuthor: React.FunctionComponent<CreateAuthorProps> = ({
  toggle,
}) => {
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
  const [initialValues] = useState(() => {
    return {
      emriPlote: null,
      ditelindja: null,
    };
  });

  const createAuthors = (data: any) => {
    dispatch(createAuthor(data));
    toggle(false);
  };
  const handleError = () => {
    console.log('error');
  };

  return (
    <div className="author-edit-container">
      <div className="author-edit-wrapper">
        <div className="title">
          <h2>Krijo Autor</h2>
        </div>
        <div className="author-details" style={{ width: '100%' }}>
          <NewBookForm
            schema={schema}
            onHandleSuccess={createAuthors}
            onHandleError={handleError}
            initialValues={initialValues}
          >
            <div className="author-data">
              <InputFormItem name="emriPlote" placeholder="Emri Plote" />
              <InputFormItem
                name="ditelindja"
                type="date"
                placeholder="Ditelindja e Autorit"
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
                Krijo Autor
              </button>
            </div>
          </NewBookForm>
        </div>
      </div>
    </div>
  );
};
