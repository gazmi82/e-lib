import React, { useState, useEffect } from 'react';
import InputFormItem from '../../../components/InputFormItem';
import NewBookForm from '../../../components/NewBookForm';
import * as yup from 'yup';
import { ReactComponent as LoginArrow } from '../../../assets/svgIcons/box-arrow-in-right.svg';
import { ReactComponent as Spinner } from '../../../assets/svgIcons/spinner.svg';
import { ReactComponent as Alert } from '../../../assets/svgIcons/error-svg.svg';
import { ReactComponent as Eye } from '../../../assets/svgIcons/eye.svg';
import { ReactComponent as EyeSlash } from '../../../assets/svgIcons/eye-slash.svg';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  userLogin,
  selectLoading,
  selectAuth,
  selectErrorMessage,
} from '../../../redux/slices/AUTH/Login/loginSlice';
import { resetBooksState } from '../../../redux/slices/Books/booksSlice';
import { useNavigate } from 'react-router';

export const Login: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const auth = useSelector(selectAuth);
  const error = useSelector(selectErrorMessage);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    username: yup
      .string()
      .nullable()
      .min(4, 'Perdoruesi duhet te permbaj te pakten 4 karaktere')
      .matches(/^\S+$/, 'Perdoruesi nuk duhet te permbaj hapsira')
      .max(20, 'Perdoruesi duhet te permbaj maksimumi 20 karaktere')
      .required('Vendosni Perdoruesin'),
    password: yup
      .string()
      .nullable()
      .max(250, 'Maksimumi 250 karaktere')
      .required('Vendosni Fjalekalimin'),
  });
  const [initialValues] = useState(() => {
    return {
      username: null,
      password: null,
    };
  });
  const onHandleError = () => {
    console.log('Error while trying to login');
  };
  const onHandleSuccess = (data: any) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (auth && !error) {
      dispatch(resetBooksState());
      navigate('/');
    }
  }, [loading]);

  const [viewPass, setViewPass] = useState(false);

  return (
    <NewBookForm
      schema={schema}
      initialValues={initialValues}
      onHandleError={onHandleError}
      onHandleSuccess={onHandleSuccess}
    >
      <div className="login-wrapper">
        <div className="login-container">
          <h2>Identifikimi</h2>
          {auth === true ? (
            <div className="successful">Identifikimi u krye me sukses!</div>
          ) : (
            ''
          )}
          {error && (
            <div className="error">
              {' '}
              <Alert fill="red" className="error-svg" />
              Perdoruesi ose fjalekalimi i gabuar
            </div>
          )}
          <InputFormItem placeholder="Perdoruesi" name="username" />
          <div className="password-container">
            <InputFormItem
              placeholder="Fjalekalimi"
              name="password"
              type={viewPass === true ? 'text' : 'password'}
            />
            {viewPass === true ? (
              <EyeSlash
                className="eye-svg"
                onClick={() => setViewPass(!viewPass)}
              />
            ) : (
              <Eye className="eye-svg" onClick={() => setViewPass(!viewPass)} />
            )}
          </div>
          <Button type="submit" className="btn-login">
            {loading === true ? (
              <Spinner className="spinner" width="15px" height="15px" />
            ) : (
              <LoginArrow className="login-arrow" />
            )}
            Hyr
          </Button>
          <div>
            Nuk keni nje llogari?{' '}
            <span
              style={{ cursor: 'pointer', color: '#3f78e0' }}
              onClick={() => navigate('/register')}
            >
              Regjistrohu
            </span>
          </div>
        </div>
      </div>
    </NewBookForm>
  );
};
