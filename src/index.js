import 'babel-polyfill';

import './assets/styles/screen.scss';

import React from 'react';
import { render } from 'react-dom';
import RootContainer from './containers/RootContainer';

render(<RootContainer />, document.getElementById('root'));