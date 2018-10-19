import { connect } from 'react-redux';
import MapView from './../components/MapView/MapView';
import { bindActionCreators } from 'redux';

import { initMap, getLocations, removeMarkers, findRoutes } from '../redux/reducers/appReducer';

const mapStateToProps = ({ app: { mapData, markersOnPage, loadingSolution, optimized, solution } }) => (
  { data: mapData, 
    markersOnPage: markersOnPage, 
    loadingSolution: loadingSolution,
    optimized: optimized,
    solution: solution
  });

const mapDispatchToProps = dispatch => bindActionCreators({
  onInit: initMap,
  generateLocation: getLocations,
  resetMarkers: removeMarkers,
  findRoutes: findRoutes
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapView);