import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/th2.png";

const Header = () => {
  return (
    <div className="header">
      <Link className="header__brand" to="/home">
        <img src={logo} alt={"exactpro logo"} width="45%" />
      </Link>
      <nav className="header__nav nav">
        <Link to="/home" className="nav__item">
          Главная
        </Link>
        <Link to="/analytics" className="nav__item">
          Аналитика
        </Link>
        <Link to="/statistics" className="nav__item">
          Отчётность
        </Link>
      </nav>
    </div>
  );
};

export default Header;
