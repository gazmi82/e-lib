import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import logo from '../../assets/images/shm-biblioteka-logo.png';
import avatar from '../../assets/images/avatar.jpg';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/slices/AUTH/Login/loginSlice';
import { resetBooksState } from '../../redux/slices/Books/booksSlice';
import useOutsideClickChecker from '../../helpers/mouseEvent';
import { getUserName, getUserRole } from '../../helpers/getUserRole';
import { ReactComponent as Avatar } from '../../assets/svgIcons/person-circle.svg';
import { ReactComponent as EmailIcon } from '../../assets/svgIcons/email.svg';
import { ReactComponent as Language } from '../../assets/svgIcons/language.svg';

export const Navbar: React.FunctionComponent = () => {
  const userName = getUserName();
  const role = getUserRole();
  const [subMenu, setSubMenu] = useState(false);
  const [userDrawer, setUserDrawer] = useState(false);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const handleLogOut = () => {
    localStorage.removeItem('idToken');
    dispatch(logOut(null));
    dispatch(resetBooksState());
    navigate('/login');
    setUserDrawer(!userDrawer);
    setSubMenu(false);
  };

  useEffect(() => {
    if (
      window.location.pathname.includes('manage') &&
      (role === 'Administrator' || role === 'Menaxher')
    ) {
      setSubMenu(true);
    }
  }, [subMenu]);

  useOutsideClickChecker(drawerRef, setUserDrawer);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-header">
        <span className="item">
          <EmailIcon className="icon" /> info@magjistratura.edu.al
        </span>
        <span className="item">
          <Language className="icon-lang" />
          Shqip
        </span>
      </div>
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
        </div>
        <div className="route-container">
          <NavLink to="/" className={`link`} onClick={() => setSubMenu(false)}>
            Kreu
          </NavLink>
          <NavLink
            to="/books"
            className={`link`}
            onClick={() => setSubMenu(false)}
          >
            Libra
          </NavLink>
          <NavLink
            to="/magazines"
            className={`link`}
            onClick={() => setSubMenu(false)}
          >
            Periodik
          </NavLink>
          {localStorage.getItem('idToken') ? (
            <>
              <NavLink
                to="/library"
                className="link"
                onClick={() => setSubMenu(false)}
              >
                Libraria Ime
              </NavLink>
              {role === 'Administrator' || role === 'Menaxher' ? (
                <NavLink
                  to="/manage/books"
                  className={`link ${
                    window.location.pathname.includes('manage') && 'active'
                  }`}
                  onClick={() => setSubMenu(true)}
                >
                  Menaxhimi
                </NavLink>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          className="avatar-container"
          ref={drawerRef}
          onClick={() => {
            if (localStorage.getItem('idToken')) {
              setUserDrawer(!userDrawer);
            } else {
              navigate('/login');
            }
          }}
        >
          <span>{userName ? userName : 'Log In'}</span>
          <img src={avatar} alt="avatar" className="avatar" />
          {/* <Avatar width="25px" height="25px" /> */}
          {userDrawer === true ? (
            <div className="user-options">
              <span
                className="option"
                onClick={() => setUserDrawer(!userDrawer)}
              >
                Cilesimet
              </span>
              <span
                className="option"
                onClick={() => setUserDrawer(!userDrawer)}
              >
                Ndihma
              </span>
              <span
                className="option"
                style={{ color: 'red' }}
                onClick={handleLogOut}
              >
                Dil
              </span>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div
        className="management-navbar"
        style={subMenu === false ? { display: 'none' } : {}}
      >
        <NavLink
          to="/manage/books"
          className={`link ${
            window.location.pathname === '/manage/books' && 'manage-active'
          }`}
          title="Libra"
        >
          Libra
        </NavLink>
        <NavLink
          to="/manage/magazines"
          className={`link ${
            window.location.pathname === '/manage/magazines' && 'manage-active'
          }`}
          title="Periodik"
        >
          Periodik
        </NavLink>
        <NavLink
          to="/manage/create-book"
          className={`link ${
            window.location.pathname === '/manage/create-book' &&
            'manage-active'
          }`}
          title="Krijo Liber"
        >
          Krijo Liber
        </NavLink>
        <NavLink
          to="/manage/authors"
          className={`link ${
            window.location.pathname === '/manage/authors' && 'manage-active'
          }`}
          title="Autore"
        >
          Autore
        </NavLink>
        {role === 'Administrator' ? (
          <NavLink
            to="/manage"
            className={`link ${
              window.location.pathname === '/manage' && 'manage-active'
            }`}
            title="Perdorues"
          >
            Perdorues
          </NavLink>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
