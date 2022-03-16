import React, { useState } from 'react';
import InputFormItem from '../../../components/InputFormItem';
import NewBookForm from '../../../components/NewBookForm';
import * as yup from 'yup';
import { ReactComponent as LoginArrow } from '../../../assets/svgIcons/box-arrow-in-right.svg';
import { ReactComponent as Spinner } from '../../../assets/svgIcons/spinner.svg';
import { ReactComponent as Eye } from '../../../assets/svgIcons/eye.svg';
import { ReactComponent as EyeSlash } from '../../../assets/svgIcons/eye-slash.svg';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  userRegister,
  selectLoading,
  selectAuth,
  selectErrorMessage,
} from '../../../redux/slices/AUTH/Register/registerSlice';
import { useForm } from 'react-hook-form';
import { ReactComponent as Alert } from '../../../assets/svgIcons/error-svg.svg';
import { useNavigate } from 'react-router';

export const Register: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const auth = useSelector(selectAuth);
  const error = useSelector(selectErrorMessage);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    emri: yup
      .string()
      .nullable()
      .matches(/^[A-Za-z ]*$/, 'Emri nuk duhet te permbaj karaktere speciale')
      .matches(/^\S+$/, 'Emri nuk duhet te permbaj hapsira')
      .max(250, 'Maksimumi 250 karaktere')
      .required('Vendosni emrin'),
    mbiemri: yup
      .string()
      .nullable()
      .matches(/^\S+$/, 'Mbiemri nuk duhet te permbaj hapsira')
      .matches(
        /^[A-Za-z ]*$/,
        'Mbiemri nuk duhet te permbaj karaktere speciale',
      )
      .max(250, 'Maksimumi 250 karaktere')
      .required('Vendosni mbiemrin'),
    email: yup
      .string()
      .nullable()
      .matches(/^\S+$/, 'Email nuk duhet te permbaj hapsira')
      .email('Email duhet te jet ne formatin "email@shembull.com"')
      .required('Vendosni emailin'),
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
      .required('Vendosni fjalekalimin'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Fjalekalimet nuk perputhen')
      .required('Konfirmoni fjalekalimin'),
  });
  const { reset } = useForm();
  const [initialValues] = useState(() => {
    return {
      emri: null,
      mbiemri: null,
      email: null,
      username: null,
      password: null,
      aprovuar: false,
    };
  });
  const onHandleError = () => {
    console.log('Error while trying to register');
  };
  const onHandleSuccess = (data: any) => {
    dispatch(userRegister(data));
    reset();
  };
  const [viewPass, setViewPass] = useState(false);
  return (
    <NewBookForm
      schema={schema}
      initialValues={initialValues}
      onHandleError={onHandleError}
      onHandleSuccess={onHandleSuccess}
    >
      <div className="register-wrapper">
        <div className="register-container">
          <h2>Regjistrohu</h2>
          {error && (
            <div className="error">
              {' '}
              <Alert fill="red" className="error-svg" />
              Perdoruesi ekziston tashme!
            </div>
          )}
          <InputFormItem placeholder="Emri" name="emri" />
          <InputFormItem placeholder="Mbiemri" name="mbiemri" />
          <InputFormItem placeholder="Perdoruesi" name="username" />
          <InputFormItem placeholder="Email" name="email" />
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
          <div className="password-container">
            <InputFormItem
              placeholder="Verifiko Fjalekalimin"
              name="confirmPassword"
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

          {auth === true ? (
            <div className="successful">Regjistrimi u krye me sukses!</div>
          ) : (
            ''
          )}

          <Button type="submit" className="btn-login">
            {loading === true ? (
              <Spinner className="spinner" width="15px" height="15px" />
            ) : (
              <LoginArrow className="login-arrow" />
            )}
            Regjistrohu
          </Button>
          <div>
            Keni nje llogari ekzistuese?{' '}
            <span
              style={{ cursor: 'pointer', color: '#3f78e0' }}
              onClick={() => navigate('/login')}
            >
              Identifikohu
            </span>
          </div>
        </div>
      </div>
    </NewBookForm>
  );
};
