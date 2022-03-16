import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as EditSvg } from '../../assets/svgIcons/card-edit.svg';
import DeleteWindow from '../../components/DeleteWindow';
import { FormProvider, useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import InputFormItem from '../../components/InputFormItem';
import {
  deleteAuthor,
  fetchSingleAuthor,
  selectLoading,
} from '../../redux/slices/Authors/authorsSlice';
import { authorsApis } from '../../redux/slices/Authors/AuthorsApi';
import AuthorEdit from '../../components/EditAuthorWindow';
import CreateAuthor from '../../components/CreateAuthor';

export const Authors: React.FunctionComponent = () => {
  const [authorArray, setAuthorArray] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [editAuthor, setEditAuthor] = useState(false);
  const [createAuthor, setCreateAuthor] = useState(false);
  const [searchName, setSearchName] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const handleGetAuthor = (id: number) => {
    dispatch(fetchSingleAuthor(id));
    setEditAuthor(!editAuthor);
  };
  const handleAuthorDelete = (id: number) => {
    dispatch(deleteAuthor(id));
  };

  useEffect(() => {
    if (authorArray.length !== 0 || !hasMore) {
      setAuthorArray([]);
      setPage(0);
      setHasMore(true);
    }
  }, [loading, searchName]);
  const loadMore = async (e: any) => {
    if (hasMore) {
      try {
        const response = await authorsApis.fetchAuthors({
          emriPlote: searchName,
          page: page,
          sort: ['emriPlote', 'asc'],
        });
        if (response.success) {
          setAuthorArray(
            page !== 0
              ? [...authorArray, ...response.payload.data.autoret]
              : [...response.payload.data.autoret],
          );
          if (
            response.payload.data.faqjaAktuale ===
              response.payload.data.numriIFaqeve - 1 ||
            response.payload.data.numriIFaqeve == 0
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

  return (
    <div className="manage-authors-container">
      <div className="manage-authors-header">
        <div className="title">
          <h2>Autoret</h2>
        </div>
        <div className="authors-filter-wrapper">
          <FormProvider {...formConfig}>
            <form className="filter-container">
              <InputFormItem
                name="search-name"
                placeholder="Kerko Autore"
                onChange={debounceByNameSearch}
              />
            </form>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setCreateAuthor(!createAuthor)}
            >
              Krijo Autore
            </button>
          </FormProvider>
        </div>
      </div>
      {createAuthor && <CreateAuthor toggle={setCreateAuthor} />}
      <div className="manage-authors-wrapper">
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
          <table className="authors-table-container">
            <thead>
              <tr className="table-row header">
                <th className="table-cell name">Emri</th>
                <th className="table-cell birthday">Ditelindja</th>
                <th className="table-cell icons"></th>
              </tr>
            </thead>
            <tbody>
              {authorArray.length !== 0 ? (
                authorArray.map((data: any, index: number) => {
                  return (
                    <tr key={index} className="table-row">
                      <td className="table-cell name" title={data.emriPlote}>
                        <div className="ellipsis-div">{data.emriPlote}</div>
                      </td>
                      <td
                        className="table-cell birthday "
                        title={data.ditelindja}
                      >
                        <div className="ellipsis-div">
                          {data.ditelindja ? data.ditelindja : 'N/A'}
                        </div>
                      </td>
                      <td className="table-cell icons">
                        <EditSvg
                          className="edit-svg"
                          onClick={() => handleGetAuthor(Number(data.id))}
                        />
                        <DeleteWindow
                          deleteAuthor={() =>
                            handleAuthorDelete(Number(data.id))
                          }
                        />
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
                <td> {editAuthor && <AuthorEdit toggle={setEditAuthor} />}</td>
              </tr>
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </div>
  );
};
