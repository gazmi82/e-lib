import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ForbidenIcon from '../assets/images/403forbiden.png';
const Forbiden = () => {
  const navigate = useNavigate();

  return (
    <div className="forbiden-page">
      <span className="fobiden-title">
        <img src={ForbidenIcon} alt="" /> <h1>Error 403 - Forbidden</h1>
      </span>

      <hr />
      <div className="forbiden-content">
        <p>Ju nuk keni te drejta aksesi ne kete faqe</p>
        <span>
          <button className="btn-primary" onClick={e => navigate('/login')}>
            Login
          </button>
          <button className="btn-primary" onClick={e => navigate('/')}>
            Home
          </button>
        </span>
      </div>
    </div>
  );
};

export default Forbiden;
