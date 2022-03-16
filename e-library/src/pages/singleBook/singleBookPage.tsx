import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchSingleBook,
  selectSingleBook,
} from '../../redux/slices/Books/singleBookSlice';
import {
  saveInLibraria,
  removeFromLibraria,
} from '../../redux/slices/Books/singleBookSlice';
import { updateBookProgres } from '../../redux/slices/Books/booksSlice';

import notificationThrower from '../../helpers/notificationThrower';

import { ReactComponent as BackArrow } from '../../assets/svgIcons/back-arrow-svg.svg';
import { ReactComponent as BookmarkFillSvg } from '../../assets/svgIcons/bookmark-fill.svg';
import { ReactComponent as BookmarkSvg } from '../../assets/svgIcons/bookmark.svg';
import { ReactComponent as BrowseBook } from '../../assets/svgIcons/browse-book.svg';
import defaultCover from '../../assets/images/defaultBook.jpg';
import PDFFrame from '../../components/PDFViewer/PDFFrame';

import { Author } from '../../interfaces/books';

const SingleBookPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleBook } = useSelector(selectSingleBook);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [favorite2, setFavorite2] = useState(singleBook?.favorite);

  useEffect(() => {
    dispatch(fetchSingleBook(id));
  }, []);

  useEffect(() => {
    setFavorite2(singleBook?.favorite);
    if (singleBook?.favorite) {
      singleBook.faqeTeLexuara === 0
        ? setPageNumber(1)
        : setPageNumber(singleBook.faqeTeLexuara);
    }
  }, [singleBook]);

  const handleProgresUpdate = () => {
    id &&
      dispatch(
        updateBookProgres({ faqeTeLexuara: pageNumber, id: Number(id) }),
      );
  };

  const handleFavorite = (type: string) => {
    if (localStorage.getItem('idToken')) {
      switch (type) {
        case 'add':
          dispatch(
            saveInLibraria({
              libri: {
                id: id,
              },
              dataRegjistrimit: new Date().toISOString().slice(0, 10),
              faqeTeLexuara: pageNumber !== 1 ? pageNumber : 0,
            }),
          );
          setFavorite2(!favorite2);
          break;
        case 'remove':
          dispatch(removeFromLibraria(id));
          setFavorite2(!favorite2);
          break;
      }
    } else {
      notificationThrower({
        type: 'info',
        title: 'Ju duhet te keni nje account qe te ruani ne librarine tuaj',
        duration: 5000,
      });
    }
  };

  const handleBrowseBook = () => {
    if (localStorage.getItem('idToken')) {
      setModal(true);
    } else {
      notificationThrower({
        type: 'info',
        title: 'Ju duhet te keni nje account qe te shfletoni dokumentin',
        duration: 5000,
      });
    }
  };

  const userProgress = singleBook
    ? `${(singleBook.faqeTeLexuara / singleBook.nrFaqeve) * 100}%`
    : '0%';

  return (
    <div className="single-book-page">
      <main className="single-page-main">
        <div className="single-book-wraper">
          {modal && (
            <PDFFrame
              pageNumber={pageNumber}
              setPageNumber={e => setPageNumber(e)}
              fileUrl={singleBook?.fileUrl}
              setModal={(e: boolean) => setModal(e)}
              isFavorite={favorite2}
              handleProgresUpdate={handleProgresUpdate}
            />
          )}
          <BackArrow
            fill="#3f78e0"
            className="back-arrow-svg"
            onClick={() => navigate(-1)}
          />
          <div className="first-section">
            <div className="book-image-container">
              <div className="book-actions">
                <button
                  className="btn-primary"
                  onClick={() => {
                    !favorite2
                      ? handleFavorite('add')
                      : handleFavorite('remove');
                  }}
                >
                  {!favorite2
                    ? 'Shto librin në librarinë tuaj'
                    : 'Hiq librin nga libraria juaj'}
                  <div className="svg">
                    {!favorite2 ? (
                      <BookmarkSvg className="favorite-svg" />
                    ) : (
                      <BookmarkFillSvg
                        className="favorite-svg"
                        fill={'#3f78e0'}
                      />
                    )}
                  </div>
                </button>
                <button
                  className="btn-primary"
                  onClick={() => handleBrowseBook()}
                >
                  Shfleto dokumentin
                  <div className="svg">
                    <BrowseBook fill="#3f78e0" />
                  </div>
                </button>
              </div>
              <div className="book-cover-progres">
                <img
                  src={singleBook?.imgUrl ?? defaultCover}
                  alt={singleBook?.imgName}
                />
                <span
                  className="book-progress"
                  style={{
                    width: userProgress,
                  }}
                ></span>
              </div>
            </div>

            <div>
              <h1 className="book-name">{singleBook?.emri}</h1>
              <hr />
            </div>
            <div className="book-primary-info">
              <div className="info-piece">
                <h3>Pershkrimi</h3>
                <span className="book-description">
                  {singleBook?.pershkrimi}
                </span>
              </div>
            </div>
          </div>

          <div className="second-section">
            <div className="book-secondary-info">
              <div id="more-info">
                <h2 className="book-name">Informacione</h2>
                <hr />
              </div>
              <span className="info-piece">
                Lloji: <b>{singleBook?.lloji}</b>
              </span>

              <div className="info-piece">
                <h3>Autoret</h3>
                <div className="authors-container">
                  {singleBook?.autoreTeLibrave?.map(
                    (data: Author, index: any) => {
                      return (
                        <span
                          key={index}
                          className="single-author"
                          title={data?.emriPlote}
                        >
                          {data?.emriPlote}
                        </span>
                      );
                    },
                  )}
                  {singleBook?.autoreTeLibrave.length == 0 && (
                    <span>Nuk ka te dhena per autoret</span>
                  )}
                </div>
              </div>
              <div className="info-piece">
                <h3>Kategorite</h3>
                <div className="category-container">
                  {singleBook?.kategoriaList?.map((data, index) => {
                    return (
                      <span key={index} className="category-list">
                        {data.listeKategoria}
                      </span>
                    );
                  })}
                  {singleBook?.kategoriaList.length == 0 && (
                    <span>Nuk ka te dhena per kategorine</span>
                  )}
                </div>
              </div>
              <div className="info-piece">
                <span>
                  Cmimi:{' '}
                  <b>
                    {singleBook?.cmimi
                      ? singleBook?.cmimi + ' Leke'
                      : 'Pa Pagese'}
                  </b>
                </span>
              </div>
              <div className="info-piece">
                <span>
                  Numri faqeve: <b>{singleBook?.nrFaqeve}</b>
                </span>
              </div>
              <div className="info-piece">
                <span>
                  Kodi ISBN: <b>{singleBook?.kodiISBN}</b>
                </span>
              </div>
              <div className="info-piece">
                <span>
                  Data Publikimit: <b>{singleBook?.dataPublikimit}</b>
                </span>
              </div>

              <div className="info-piece">
                <span>
                  Data Rregjistrimit: <b>{singleBook?.dataRegjistrimit}</b>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleBookPage;
