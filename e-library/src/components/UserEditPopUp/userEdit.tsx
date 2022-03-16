import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetUserState,
  selectSingleUser,
  updateUserRole,
} from '../../redux/slices/Users/usersSlice';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';
import NewBookForm from '../NewBookForm';
import {
  userApproveOptions,
  userRoleOptions,
  userTypeOptions,
} from '../SelectOptions/selectFieldOptions';
import SingleSelectFormItem from '../SingleSelectFormItem';
import * as yup from 'yup';
import userRoleDataTransformer from '../../helpers/editUser/userRoleDataTransformer';

interface UserEditProps {
  toggle: any;
}

export const UserEdit: React.FunctionComponent<UserEditProps> = ({
  toggle,
}) => {
  const user = useSelector(selectSingleUser);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    aprovuar: yup.boolean().nullable().required('Zgjidhni nje nga opsionet'),
    roli: yup.string().nullable().required('Zgjidhni nje nga opsionet'),
    tipPerdorues: yup.string().when('roli', {
      is: 'PERDORUES',
      then: yup.string().nullable().required('Zgjidhni nje nga opsionet'),
      otherwise: yup.string().nullable(),
    }),
  });
  const [initialValues, setInitialValues] = useState<any>(null);
  const [userRole, setUserRole] = useState('');
  const [userType, setUserType] = useState<any>();

  useEffect(() => {
    dispatch(resetUserState());
    if (user) {
      setInitialValues(() => {
        return {
          emri: user?.emri,
          mbiemri: user?.mbiemri,
          email: user?.email,
          username: user?.username,
          aprovuar: user?.aprovuar,
          id: user?.id,
          roli: user?.roli,
          tipPerdorues: user?.tipPerdorues,
        };
      });
    }
  }, [user]);

  useEffect(() => {
    if (userRole != 'PERDORUES' && initialValues?.roli != 'PERDORUES') {
      setUserType(null);
    } else {
      setUserType(initialValues?.tipPerdorues);
    }
  }, [userRole]);

  const updateUser = (data: any) => {
    const transformedData = userRoleDataTransformer(data);
    console.log(transformedData);

    dispatch(
      updateUserRole({ data: transformedData, id: Number(initialValues?.id) }),
    );
    toggle(false);
  };
  const handleError = () => {
    console.log('error');
  };

  return (
    <>
      {initialValues ? (
        <div className="user-edit-container">
          <div className="user-edit-wrapper">
            <div className="title">
              <h2>Modifiko Perdoruesin</h2>
            </div>
            <div className="user-details">
              <div className="detail">
                <span className="detail-title">Emri: </span>
                <span className="detail-value"> {initialValues?.emri}</span>
              </div>
              <div className="detail">
                <span className="detail-title">Mbiemri: </span>
                <span className="detail-value"> {initialValues?.mbiemri}</span>
              </div>
              <div className="detail">
                <span className="detail-title">Email:</span>
                <span className="detail-value"> {initialValues?.email}</span>
              </div>
              <div className="detail">
                <span className="detail-title">Username: </span>
                <span className="detail-value"> {initialValues?.username}</span>
              </div>
              <NewBookForm
                schema={schema}
                onHandleSuccess={updateUser}
                onHandleError={handleError}
                initialValues={initialValues}
              >
                <div className="user-details">
                  <div className="dropdown">
                    <SingleSelectFormItem
                      name="roli"
                      placeholder="Roli"
                      initialValue={initialValues?.roli}
                      options={userRoleOptions}
                      onChange={(e: any) => {
                        setInitialValues((oldInitialValues: any) => {
                          setUserRole(e.value);
                          return {
                            ...oldInitialValues,
                            tipPerdorues: null,
                            roli: e.value,
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="dropdown">
                    <SingleSelectFormItem
                      name="tipPerdorues"
                      placeholder="Tip Perdoruesi"
                      initialValue={initialValues?.tipPerdorues}
                      disabled={
                        userRole != 'PERDORUES' &&
                        initialValues.roli != 'PERDORUES'
                      }
                      options={userTypeOptions}
                      onChange={(e: any) => {
                        setInitialValues((oldInitialValues: any) => {
                          return {
                            ...oldInitialValues,
                            tipPerdorues: e.value,
                          };
                        });
                      }}
                    />
                  </div>
                  <div className="dropdown">
                    <SingleSelectFormItem
                      name="aprovuar"
                      placeholder="Aprovuar"
                      initialValue={
                        initialValues?.aprovuar == false
                          ? 'Inaktiv'
                          : initialValues?.aprovuar
                      }
                      options={userApproveOptions}
                      onChange={(e: any) => {
                        setInitialValues((oldInitialValues: any) => {
                          return {
                            ...oldInitialValues,
                            aprovuar: e.value,
                          };
                        });
                      }}
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
