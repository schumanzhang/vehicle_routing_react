import React, { Component } from 'react';
import MapContainer from './../MapContainer/MapContainer';
import OptimizedComponent from './../Optimized/Optimized';

class MapView extends Component {

  constructor(props) {
    super(props);
    this.onGenerateLocations = this.onGenerateLocations.bind(this);
    this.onResetMarkers = this.onResetMarkers.bind(this);
    this.onOptimizeSolution = this.onOptimizeSolution.bind(this);
    this.state = {
      routes: [],
      colors: ['#1abc9c', '#8e44ad', '#3498db', '#9b59b6', '#34495e',
      '#f1c40f', '#2ecc71', '#e74c3c', '#f39c12', '#95a5a6']
    };
  }

  componentDidMount() {
    const { onInit } = this.props;
    onInit();
    // console.log('MapView:', this.props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('MapView', nextProps);
    if (nextProps.optimized && !nextProps.loadingSolution) {
      console.log('new solution');
      let solution = JSON.parse(JSON.stringify(nextProps.solution));
      let markers = JSON.parse(JSON.stringify(nextProps.data.markers));
      this.calculatePolylines(solution, markers);
    }
  }

  calculatePolylines(solution, markers) {
    let routes = [];
    for (let key of Object.keys(solution)) {
      if (solution[key].hasOwnProperty('route')) {
        if (solution[key]['route'].length > 1) {
          routes.push({ route: solution[key]['route'], 
                        load: solution[key]['load'], 
                        totalDist: solution[key]['total_route_distance'],
                        totalLoad: solution[key]['total_load'],
                        triangleCoords: []
                      });
        }
      }
    }

    for (let r of routes) {
      for (let stop of r.route) {
        r.triangleCoords.push({lat: markers[stop][0], lng: markers[stop][1]})
      }
    }

    this.setState({routes: routes});
  }

  onGenerateLocations() {
    const { generateLocation } = this.props;
    generateLocation();
  }

  onResetMarkers() {
    const { resetMarkers } = this.props;
    resetMarkers();
  }

  onOptimizeSolution() {
    const { findRoutes } = this.props;
    findRoutes({'demands': this.props.data.demands});
  }

  renderOptimizedComponent() {
    if (this.props.markersOnPage) {
      return <OptimizedComponent mapData={this.props.data} 
      optimize={this.onOptimizeSolution} 
      loading={this.props.loadingSolution} 
      optimized={this.props.optimized}
      routes={this.state.routes}></OptimizedComponent>
    }
    return <div></div>
  }

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <MapContainer mapData={this.props.data} 
          markersOnPage={this.props.markersOnPage} 
          generateMarkers={this.onGenerateLocations} 
          resetMarkers={this.onResetMarkers}
          routes={this.state.routes}
          colors={this.state.colors}
          />
          {this.renderOptimizedComponent()}
        </main>
      </React.Fragment>
    );
  }

}

MapView.defaultProps = {
  data: {},
};

export default MapView;