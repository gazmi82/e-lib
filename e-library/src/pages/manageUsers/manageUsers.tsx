import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { usersApis } from '../../redux/slices/Users/usersApi';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as EditSvg } from '../../assets/svgIcons/card-edit.svg';

import {
  deleteUser,
  fetchSingleUser,
  selectLoading,
} from '../../redux/slices/Users/usersSlice';
import DeleteWindow from '../../components/DeleteWindow';
import UserEdit from '../../components/UserEditPopUp';
import { FormProvider, useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import InputFormItem from '../../components/InputFormItem';
import SingleSelectFormItem from '../../components/SingleSelectFormItem';
import { userTypeOptions } from '../../components/SelectOptions/selectFieldOptions';
import { getUserName } from '../../helpers/getUserRole';

export const ManageUsers: React.FunctionComponent = () => {
  const userName = getUserName();
  const [userArray, setUserArray] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loading = useSelector(selectLoading);
  const [editUser, setEditUser] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [userType, setUserType] = useState();
  const dispatch = useDispatch();

  const handleGetUser = (id: number) => {
    setEditUser(!editUser);
    dispatch(fetchSingleUser(id));
  };
  const handleUserDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (userArray.length !== 0 || !hasMore) {
      setUserArray([]);
      setPage(0);
      setHasMore(true);
    }
  }, [loading, userType, searchName, searchLastName]);
  const loadMore = async (e: any) => {
    if (hasMore) {
      try {
        const response = await usersApis.fetchUsers({
          tipPerdorues: userType,
          emri: searchName,
          mbiemri: searchLastName,
          page: page,
          sort: ['aprovuar', 'asc'],
        });
        if (response.success) {
          setUserArray(
            page !== 0
              ? [...userArray, ...response.payload.data.perdoruesit]
              : [...response.payload.data.perdoruesit],
          );
          if (
            response.payload.data.faqjaAktuale ===
              response.payload.data.gjithaFaqet - 1 ||
            response.payload.data.gjithaFaqet == 0
          ) {
            setHasMore(false);
          }
          setPage(page + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const formConfig = useForm({
    reValidateMode: 'onBlur',
    mode: 'onChange',
  });

  const searchByName = (e: any) => {
    setSearchName(e?.target?.value);
  };
  const debounceByNameSearch = debounce(searchByName, 500);
  const searchByLast = (e: any) => {
    setSearchLastName(e?.target?.value);
  };
  const debounceByLastSearch = debounce(searchByLast, 500);
  return (
    <div className="manage-users-container">
      <div className="manage-users-header">
        <div className="title">
          <h2>Perdoruesit</h2>
        </div>
        <div className="user-filter-wrapper">
          <FormProvider {...formConfig}>
            <form className="filter-container">
              <InputFormItem
                name="search-name"
                placeholder="Kerko Emer"
                onChange={debounceByNameSearch}
              />
              <InputFormItem
                name="search-lastname"
                placeholder="Kerko Mbiemer"
                onChange={debounceByLastSearch}
              />
              <SingleSelectFormItem
                name="userTypeFilter"
                placeholder="Tip Perdoruesi"
                options={userTypeOptions}
                onChange={(e: any) => setUserType(e?.value ?? null)}
                isClearable
              />
            </form>
          </FormProvider>
        </div>
      </div>
      <div className="manage-users-wrapper">
        <InfiniteScroll
          initialLoad
          pageStart={0}
          loadMore={e => loadMore(e)}
          hasMore={hasMore}
          loader={
            <div className="loader" key={0}>
              <Spinner className="spinner load-spin" />
            </div>
          }
        >
          <table className="user-container">
            <thead>
              <tr className="table-row header">
                <th className="table-cell name">Emri</th>
                <th className="table-cell email">Email</th>
                <th className="table-cell role">Roli</th>
                <th className="table-cell user-type">Tip Perdoruesi</th>
                <th className="table-cell status">Statusi</th>
                <th className="table-cell icons"></th>
              </tr>
            </thead>
            <tbody>
              {userArray.length !== 0 ? (
                userArray.map((data: any, index: number) => {
                  return (
                    <tr key={index} className="table-row">
                      <td
                        className="table-cell name"
                        title={data.emri + ' ' + data.mbiemri}
                      >
                        <div className="ellipsis-div">
                          {data.emri} {data.mbiemri}
                        </div>
                      </td>
                      <td className="table-cell email " title={data.email}>
                        <div className="ellipsis-div"> {data.email}</div>
                      </td>
                      <td className="table-cell role" title={data.roli}>
                        {data?.roli ? data?.roli : 'N/A'}
                      </td>
                      <td
                        className="table-cell user-type"
                        title={data.tipPerdorues}
                      >
                        {data?.tipPerdorues ? data?.tipPerdorues : 'N/A'}
                      </td>
                      <td className="table-cell status">
                        <span
                          className="single-status"
                          style={
                            data.aprovuar
                              ? {
                                  backgroundColor: ' rgb(72 223 106 / 63%)',
                                }
                              : {
                                  backgroundColor: 'rgb(230 70 85 / 63%)',
                                }
                          }
                        >
                          {data.aprovuar ? 'Aktiv' : 'Inaktiv'}
                        </span>
                      </td>

                      <td className="table-cell icons">
                        {data?.username === userName ? (
                          ''
                        ) : (
                          <>
                            <EditSvg
                              className="edit-svg"
                              onClick={() => handleGetUser(Number(data.id))}
                            />
                            <DeleteWindow
                              deleteUser={() =>
                                handleUserDelete(Number(data.id))
                              }
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="table-row">
                  <td className="table-cell"> Nuk ka te dhena</td>
                </tr>
              )}
              <tr>
                <td>{editUser && <UserEdit toggle={setEditUser} />}</td>
              </tr>
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
};
