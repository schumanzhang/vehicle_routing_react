import React, { Component } from 'react';
import Loading from './../Loading/Loading';
import VehicleComponent from './../Vehicle/Vehicle';

import './Optimized.scss';

class OptimizedComponent extends Component {

  constructor(props) {
    super(props)
  }

  renderSolution() {
    if (this.props.optimized) {
      return <p>A routing solution has been found</p>
    }
    return <div></div>
  }

  renderLoading() {
    if (this.props.loading) {
      return <Loading></Loading>
    }
    return <div></div>
  }

  renderVehicleRoutes() {
    if (this.props.optimized) {
      let { routes } = this.props;
      return routes.map((route, i) => {
        console.log('renderVehicleRoutes:', route);
        return <VehicleComponent route={route} key={i} number={i}/>
      });
    }
    return <div></div>
  }

  render() {
    return <div className="optimized-container">
      <button onClick={this.props.optimize} className="route-button">Find Optimized Routes</button>
      <p>This problem domain has 10 vehicles. Each vehicle has a capacity of 15kg. The routing is to minimize travel distance.</p>
      {this.renderLoading()}
      {this.renderSolution()}
      {this.renderVehicleRoutes()}
    </div>
  }

}

export default OptimizedComponent;