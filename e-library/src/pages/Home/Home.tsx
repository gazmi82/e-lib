import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
interface HomeProps {
  children: any;
}
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RightArrow } from '../../assets/svgIcons/right-arrow.svg';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectBooks,
  selectLoading,
  fetchBooks,
  fetchHomePageData,
  selectHomePageData,
} from '../../redux/slices/Books/booksSlice';
import HomeBanner from '../../components/HomePageBanner';
import { ReactComponent as Spinner } from '../../assets/svgIcons/spinner.svg';

export const Home: React.FunctionComponent<HomeProps> = () => {
  const dispatch = useDispatch();
  const booksState = useSelector(selectBooks);
  const homeData = useSelector(selectHomePageData);
  const loading = useSelector(selectLoading);
  const [bookHover, setbookHover] = useState(false);
  const [revistHover, setRevistHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchHomePageData({
        type: 'revist',
        query: { lloji: 'PERIODIK', numri: 5 },
      }),
    );
    dispatch(
      fetchHomePageData({ type: 'liber', query: { lloji: 'LIBER', numri: 5 } }),
    );
  }, []);

  return (
    <main className="home-container">
      <div className="home-wrapper">
        <HomeBanner />
        <div className="books">
          <div className="home-section-header">
            <h2>Libra</h2>
            <span
              onClick={() => navigate('/books')}
              onMouseEnter={() => setbookHover(true)}
              onMouseLeave={() => setbookHover(false)}
            >
              Shiko te gjitha{' '}
              <RightArrow
                style={bookHover ? { fill: 'white' } : { fill: '#272e6e' }}
                className="right-arrow"
              />
            </span>
          </div>
          {!loading && homeData.homeBooks.length === 0 ? (
            <span style={{ width: '100%' }}>Nuk ka te dhena</span>
          ) : (
            <div className="books-section">
              {booksState.loading ? (
                <div className="loader-container">
                  <div className="loader" key={0}>
                    <Spinner className="spinner load-spin" />
                  </div>
                </div>
              ) : (
                homeData.homeBooks.map((data, index) => {
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
              )}
            </div>
          )}
        </div>
        <div className="resvists">
          <div className="home-section-header">
            <h2>Periodik</h2>
            <span
              onClick={() => navigate('/magazines')}
              onMouseEnter={() => setRevistHover(true)}
              onMouseLeave={() => setRevistHover(false)}
            >
              Shiko te gjitha
              <RightArrow
                style={revistHover ? { fill: 'white' } : { fill: '#272e6e' }}
                className="right-arrow"
              />
            </span>
          </div>
          {!loading && homeData.homeRevist.length === 0 ? (
            <span style={{ width: '100%' }}>Nuk ka te dhena</span>
          ) : (
            <div className="books-section">
              {booksState.loading ? (
                <div className="loader-container">
                  <div className="loader" key={0}>
                    <Spinner className="spinner load-spin" />
                  </div>
                </div>
              ) : (
                homeData.homeRevist.map((data, index) => {
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
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
