import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import SingleSelectFormItem from '../../components/SingleSelectFormItem';
import {
  bookCategoryOptions,
  fieldOptions,
} from '../../components/SelectOptions/selectFieldOptions';
import { FormProvider, useForm } from 'react-hook-form';
import InputFormItem from '../../components/InputFormItem';
import { ReactComponent as DownArrow } from '../../assets/svgIcons/down-arrow.svg';
import { ReactComponent as UpArrow } from '../../assets/svgIcons/up-arrow.svg';
import { ReactComponent as BackArrow } from '../../assets/svgIcons/back-arrow-svg.svg';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';
import { ReactComponent as Filter } from '../../assets/svgIcons/filter.svg';
import InfiniteScroll from 'react-infinite-scroller';
import debounce from 'lodash.debounce';
import { booksApis } from '../../redux/slices/Books/BooksApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetBookState } from '../../redux/slices/Books/singleBookSlice';
import notificationThrower from '../../helpers/notificationThrower';
import { selectLoading } from '../../redux/slices/Books/booksSlice';

interface ViewAllBooksProps {
  children: any;
}

export const ViewAllBooks: React.FunctionComponent<ViewAllBooksProps> = () => {
  const navigate = useNavigate();
  const [field, setField] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [category, setCategory] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [bookArray, setBookArray] = useState<Array<any>>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filterToggle, setFilterToggle] = useState(false);
  const [sort, setSort] = useState({
    by: 'id',
    order: 'desc',
    active: false,
  });
  const SetBookOrder = () => {
    if (sort.by === 'id' && sort.order === 'desc') {
      setSort({ by: 'emri', order: 'asc', active: true });
    } else if (sort.by === 'emri' && sort.order === 'asc') {
      setSort({ by: 'emri', order: 'desc', active: true });
    } else {
      setSort({ by: 'emri', order: 'asc', active: true });
    }
  };

  useEffect(() => {
    dispatch(resetBookState());
  }, []);

  useEffect(() => {
    if (bookArray.length !== 0 || !hasMore) {
      setBookArray([]);
      setPage(0);
      setHasMore(true);
    }
  }, [searchTitle, category, field, sort, searchAuthor, loading]);

  const loadMore = async (pg?: any) => {
    if (hasMore) {
      try {
        const response = await booksApis.fetchAllBooks({
          lloji: 'LIBER',
          emri: searchTitle,
          autori: searchAuthor,
          kategoria: category,
          fusha: field,
          sort: [sort.by, sort.order],
          page: page,
        });

        if (response.success) {
          setBookArray(
            page !== 0
              ? [...bookArray, ...response.payload.data.librat]
              : [...response.payload.data.librat],
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
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 4000,
          message: error as string,
        });
      }
    }
  };

  const formConfig = useForm({
    reValidateMode: 'onBlur',
    mode: 'onChange',
  });
  const searchBook = (e: any) => {
    setSearchTitle(e?.target?.value);
  };
  const debounceBookSearch = debounce(searchBook, 500);
  const searchAuth = (e: any) => {
    setSearchAuthor(e?.target?.value);
  };
  const debounceAuthorSearch = debounce(searchAuth, 500);
  return (
    <main className="all-books-container">
      <div className="view-books-wrapper">
        <div className="view-books-header">
          <div className="flex-title">
            <div className="title">
              <span onClick={() => navigate(-1)}>
                <BackArrow fill="#3f78e0" className="back-arrow-svg" />
              </span>
              <h2>Libra</h2>
            </div>
            <Filter
              className="filter-svg2"
              style={{ width: '25px', height: '25px', cursor: 'pointer' }}
              onClick={() => setFilterToggle(!filterToggle)}
            />
          </div>
          <div className="filter-wrapper">
            <FormProvider {...formConfig}>
              <form
                className={`
                ${filterToggle ? 'slide-in' : 'slide-out'} 
                filter-container`}
              >
                <Filter
                  className="filter-svg"
                  style={{ width: '25px', height: '25px', cursor: 'pointer' }}
                  onClick={() => setFilterToggle(!filterToggle)}
                />
                <div
                  className="asc-filter"
                  onClick={SetBookOrder}
                  style={sort.active ? { borderColor: '#3f78e0' } : {}}
                >
                  {sort.order === 'desc' ? (
                    <span style={sort.active ? { color: '#3f78e0' } : {}}>
                      Rendit A-Z{' '}
                      <DownArrow
                        className="arrow-svg"
                        style={sort.active ? { fill: '#3f78e0' } : {}}
                      />{' '}
                    </span>
                  ) : (
                    <span style={sort.active ? { color: '#3f78e0' } : {}}>
                      Rendit Z-A{' '}
                      <UpArrow
                        className="arrow-svg"
                        style={sort.active ? { fill: '#3f78e0' } : {}}
                      />
                    </span>
                  )}
                </div>
                <div className="two-filters-container">
                  <InputFormItem
                    name="search-book"
                    placeholder="Kerko Liber"
                    onChange={debounceBookSearch}
                  />
                  <InputFormItem
                    name="search-author"
                    placeholder="Kerko Autor"
                    onChange={debounceAuthorSearch}
                  />
                </div>
                <div className="two-filters-container">
                  <SingleSelectFormItem
                    name="kategoriFilter"
                    placeholder="Kategori"
                    options={bookCategoryOptions}
                    onChange={(e: any) => setCategory(e?.value ?? null)}
                    isClearable
                  />
                  <SingleSelectFormItem
                    name="fieldFilter"
                    placeholder="Fusha"
                    options={fieldOptions}
                    onChange={(e: any) => setField(e?.value ?? null)}
                    isClearable
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
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
          <div className="books-container">
            {bookArray.length !== 0 ? (
              bookArray?.map((data: any, index: number) => {
                const props = {
                  id: data.id,
                  title: data.emri,
                  image: data.imgUrl,
                  favorite: data.favorite,
                  category: data.kategoriaList,
                  page_nr: data.nrFaqeve,
                  authors: data.autoreTeLibrave,
                  userProgress: (data.faqeTeLexuara / data.nrFaqeve) * 100,
                };
                return <Card key={index} {...props} />;
              })
            ) : (
              <span style={{ width: '100%' }}>Nuk ka te dhena</span>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </main>
  );
};
