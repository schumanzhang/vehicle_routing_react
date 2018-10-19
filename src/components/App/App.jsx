import React from 'react';
import PropTypes from 'prop-types';
import Nav from './../Nav/Nav';

import './App.scss';

const App = ({ children }) => (
  <div className="app">
    <Nav />
    {children}
  </div>
);

App.defaultProps = {
  children: null,
};

App.propTypes = {
  children: PropTypes.node,
};

export default App;