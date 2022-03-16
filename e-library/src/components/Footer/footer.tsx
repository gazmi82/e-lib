import React from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import { ReactComponent as Facebook } from '../../assets/svgIcons/facebook.svg';
import { ReactComponent as LinbkedIn } from '../../assets/svgIcons/linkedin.svg';
import { ReactComponent as Web } from '../../assets/svgIcons/language.svg';
import OnlyLogo from '../../assets/images/logo-only.png';
import EuroLogo from '../../assets/images/euro-logo.png';
export const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-section">
          <span>
            <img src={OnlyLogo} alt="" />
            <img src={EuroLogo} alt="" />
          </span>
          <h3>Biblioteka Digjitale e Shkolles se Magjistratures</h3>
          <span className="social-media">
            <span>
              <Facebook />
            </span>
            <span>
              <LinbkedIn />
            </span>
            <span>
              <Web />
            </span>
          </span>
          <p>biblioteka@magjistratura.edu.al</p>
        </div>
        <div className="footer-section">
          <h3>Linqe te shpejta</h3>
          <NavLink to="/" className={`footer-link`}>
            Kreu
          </NavLink>
          <NavLink to="/books" className={`footer-link`}>
            Libra
          </NavLink>
          <NavLink to="/magazines" className={`footer-link`}>
            Periodik
          </NavLink>
          <NavLink to="/library" className={`footer-link`}>
            Libraria ime
          </NavLink>
        </div>
        <div className="footer-section">
          <h3>Harta</h3>
          <iframe
            width="100%"
            height="100%"
            style={{ border: '0', top: '0' }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.829883970267!2d19.79278571556021!3d41.33431240724644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135031e0848900d1%3A0x651c5d18764b6924!2sShkolla%20e%20Magjistratur%C3%ABs!5e0!3m2!1sen!2s!4v1629964050225!5m2!1sen!2s`}
          ></iframe>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <span>
            Copyright &copy; 2022 - Te gjithe te drejtat e rezervuara Shkolla e
            magjistratures
          </span>
          <span>Financuar nga Keshilli i Europes</span>
        </div>
      </div>
    </div>
  );
};
