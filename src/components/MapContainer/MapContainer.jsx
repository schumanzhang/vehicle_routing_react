import apiKey from './apiKey';
import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';

import './MapContainer.scss';

class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.generate = this.generate.bind(this);
    this.reset = this.reset.bind(this);
  }

  generate(e) {
    this.props.generateMarkers();
  }

  reset(e) {
    this.props.resetMarkers();
  }

  renderPolylines() {
    if (this.props.routes.length > 0) {
      console.log('renderPolylines:', this.props.routes);
      return this.props.routes.map((route, i) => {
        let t = route.triangleCoords;
        return <Polyline key={i} path={t} strokeColor={this.props.colors[i]}
        strokeOpacity={1}
        strokeWeight={4} />
      });
    }
  }

  renderMarkers() {
    if (this.props.markersOnPage) {
      let { markers, demands } = this.props.mapData;
      return markers.map((mark, i) => {
        if (i === 0) {
          return <Marker key={i} icon={{
            url: "https://openclipart.org/download/177826/color-icons-green-home.svg",
            scaledSize: new google.maps.Size(55,55)
          }} position={{lat: mark[0], lng: mark[1]}} name={'depot'}></Marker>
        } else {
          return <Marker key={i} title={'Load: ' + demands[i] + 'kg'} position={{lat: mark[0], lng: mark[1]}} name={'delivery'}></Marker>
        }
      });
    }
  }

  renderGenerateButton() {
    return (!this.props.markersOnPage) ? <button onClick={this.generate} className="generate">Generate Delivery Locations</button> : 
      <button onClick={this.reset} className="generate">Reset</button>
  }

  render() {
    const { initialLocation, zoomLevel } = this.props.mapData;
    return (
      <React.Fragment>
        <div className="map-container">
          <Map google={this.props.google} zoom={zoomLevel} initialCenter={initialLocation}>
            {this.renderMarkers()}
            {this.renderPolylines()}
          </Map>
        </div>
        <div className="button-row">
          {this.renderGenerateButton()}
        </div>
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey.key
})(MapContainer)