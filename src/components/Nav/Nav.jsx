import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

const Nav = () => (
  <nav className="nav">
    <h2 className="nav__title">
      Vehicle Routing Example
    </h2>
    <ul className="nav__list">
      <li>
        <NavLink exact to="/" className="nav__btn" activeClassName="nav__btn--active">
          Map View
        </NavLink>
      </li>
      <li>
        <NavLink to="/settings" className="nav__btn" activeClassName="nav__btn--active">
          Settings
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;