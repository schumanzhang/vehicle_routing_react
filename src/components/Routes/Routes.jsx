import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import MapViewLoadable from '../../loadables/MapViewLoadables';
import SettingsViewLoadable from '../../loadables/SettingsViewLoadables';

import './Routes.scss';

const NoPage = () => (<div />);

const Routes = ({ location }) => (
  <TransitionGroup className="routes">
    <CSSTransition key={location.key} timeout={500} classNames="routes-">
      <Switch location={location}>
        <Route exact path="/" component={MapViewLoadable} />
        <Route path="/settings" component={SettingsViewLoadable} />
        <Route path="*" component={NoPage} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
);

Routes.defaultProps = {
  location: {
    key: '',
  },
};

Routes.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
};

export default Routes;
