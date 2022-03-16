import React, { useState, useEffect } from 'react';
import { ReactComponent as PageSvg } from '../../assets/svgIcons/book-pages-svg.svg';
import { ReactComponent as BookmarkSvg } from '../../assets/svgIcons/bookmark.svg';
import { ReactComponent as BookmarkFillSvg } from '../../assets/svgIcons/bookmark-fill.svg';
import { ReactComponent as Edit } from '../../assets/svgIcons/card-edit.svg';
import ProgressBar from '../ProgressBar';
import { Author } from '../../interfaces/books';
import defaultCover from '../../assets/images/defaultBook.jpg';
import defaultCoverWhite from '../../assets/images/DefaultBookWhite.png';
import {
  saveInLibraria,
  removeFromLibraria,
} from '../../redux/slices/Books/singleBookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import notificationThrower from '../../helpers/notificationThrower';

interface CardProps {
  id?: number;
  title?: string;
  image?: string;
  category?: any;
  publish_date?: string;
  page_nr?: number;
  favorite?: boolean;
  description?: string;
  authors?: Array<Author>;
  userProgress?: number;
}

export const Card: React.FunctionComponent<CardProps> = ({
  id,
  title,
  image,
  category,
  favorite,
  page_nr,
  authors,
  userProgress,
}) => {
  const [favorite2, setFavorite2] = useState(favorite);
  const [mouseOver, setMouseOver] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [manager, setManager] = useState(false);

  useEffect(() => {
    setFavorite2(favorite);
  }, [favorite]);

  useEffect(() => {
    if (
      window.location.pathname === '/manage/books' ||
      window.location.pathname === '/manage/magazines'
    ) {
      setManager(true);
    } else {
      setManager(false);
    }
  }, []);

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
              faqeTeLexuara: 0,
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
        title:
          'Ju duhet te keni nje account qe te ruani librat nje librarine tuaj',
        duration: 5000,
      });
    }
  };

  return (
    <div
      className="card"
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <div className="card-image">
        <img src={image ?? defaultCover} alt={title} />
        {!manager && (
          <ProgressBar
            className="progress-bar"
            userProgress={userProgress ? userProgress : 0}
          />
        )}
        {!manager && mouseOver && (
          <div className="read-book">
            <button
              onClick={e => navigate(`/books/${id}`)}
              className="read-book-button"
            >
              Lexo librin
            </button>
          </div>
        )}
      </div>
      <div className="card-content">
        <div className="tags-container">
          {category.length >= 1 && (
            <span className="tags" title={category[0].listeKategoria}>
              {category[0].listeKategoria}
            </span>
          )}
          {category.length > 1 && (
            <span className="more-tags"> {`+${category.length - 1}`}</span>
          )}
        </div>
        <h3 className="card-title" title={title}>
          {title}
        </h3>
        <div className="card-bottom">
          <div className="authors">
            {authors?.map((data: Author, index: any) => {
              if (index <= 0) {
                return (
                  <span
                    key={index}
                    className="single-author"
                    title={data?.emriPlote}
                  >
                    {data?.emriPlote}
                  </span>
                );
              }
            })}
            {authors && authors?.length > 1 && (
              <span className="more-authors"> {`+${authors?.length - 1}`}</span>
            )}
          </div>
          <div className="pages-row-stack">
            <PageSvg className="page-svg" />
            {page_nr} <span>Faqe</span>
          </div>
        </div>
        {!manager ? (
          <div className="svg">
            {!favorite2 ? (
              <BookmarkSvg
                className="add-favorite-svg"
                onClick={() => {
                  handleFavorite('add');
                }}
                fill={'#0a164c'}
              />
            ) : (
              <BookmarkFillSvg
                className="favorite-svg"
                onClick={() => {
                  handleFavorite('remove');
                }}
                fill={'#0a164c'}
              />
            )}
          </div>
        ) : (
          <div className="svg">
            <Edit
              onClick={() => navigate(`/manage/edit-books/${id}`)}
              className="favorite-svg"
            />
          </div>
        )}
      </div>
    </div>
  );
};
