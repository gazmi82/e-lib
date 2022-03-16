import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { FormProvider, useForm } from 'react-hook-form';
import InputFormItem from '../../components/InputFormItem';
import { ReactComponent as DownArrow } from '../../assets/svgIcons/down-arrow.svg';
import { ReactComponent as UpArrow } from '../../assets/svgIcons/up-arrow.svg';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';
import { ReactComponent as Filter } from '../../assets/svgIcons/filter.svg';
import { booksApis } from '../../redux/slices/Books/BooksApi';
import debounce from 'lodash.debounce';
import InfiniteScroll from 'react-infinite-scroller';
import notificationThrower from '../../helpers/notificationThrower';

interface MyLibraryProps {
  children: any;
}

export const MyLibrary: React.FunctionComponent<MyLibraryProps> = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [page, setPage] = useState(0);
  const [bookData, setBookData] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState(true);
  const [filterToggle, setFilterToggle] = useState(false);
  const [sort, setSort] = useState({
    by: 'id',
    order: 'desc',
    active: false,
  });
  const SetBookOrder = () => {
    if (sort.by === 'id' && sort.order === 'desc') {
      setSort({ by: 'libri.emri', order: 'asc', active: true });
    } else if (sort.by === 'libri.emri' && sort.order === 'asc') {
      setSort({ by: 'libri.emri', order: 'desc', active: true });
    } else {
      setSort({ by: 'libri.emri', order: 'asc', active: true });
    }
  };

  useEffect(() => {
    if (bookData.length !== 0 || !hasMore) {
      setBookData([]), setPage(0), setHasMore(true);
    }
  }, [searchTitle, sort, searchAuthor]);

  const loadMore = async (e: any) => {
    if (hasMore) {
      try {
        const response = await booksApis.getLibrary({
          emerLibri: searchTitle,
          autori: searchAuthor,
          sort: [sort.by, sort.order],
          page: page,
        });
        if (response.success) {
          setBookData(
            page !== 0
              ? [...bookData, ...response.payload.data.librat]
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
    <main className="all-books-container library">
      <div className="view-books-wrapper">
        <div className="view-books-header">
          <div className="flex-title">
            <div className="title">
              <h2>Libraria</h2>
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
            {bookData.length !== 0 ? (
              bookData?.map((data: any, index: number) => {
                const props = {
                  id: data.libri.id,
                  title: data.libri.emri,
                  image: data.libri.imgUrl,
                  favorite: true,
                  category: data.libri.kategoriaList,
                  page_nr: data.libri.nrFaqeve,
                  authors: data.libri.autoreTeLibrave,
                  userProgress:
                    (data.faqeTeLexuara / data.libri.nrFaqeve) * 100,
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
