const initialState = {
  mapData: {
    initialLocation: {},
    zoomLevel: 0,
    markers: [],
    demands: [],
    polylines: []
  },
  markersOnPage: false,
  optimized: false,
  loadingSolution: false,
  solution: {},
  errors: null
};

export const GET_LOCATIONS = 'INIT_LOCATIONS';
export const FIND_ROUTES = 'FIND_ROUTES';

export default (state=initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'INIT_MAP':
      return {
        ...state,
        markersOnPage: false,
        optimized: false,
        mapData: payload
      }
    case 'GET_LOCATIONS_COMPLETE':
      return {
        ...state,
        mapData: {
          ...state.mapData,
          markers: payload.markers,
          demands: payload.demands
        },
        markersOnPage: payload.isComplete
      }
    case 'REMOVE_MARKERS':
      return {
        ...state,
        mapData: {
          ...state.mapData,
          markers: payload.markers
        },
        markersOnPage: false
      }
    case 'FETCH_FAILED':
      return {
        ...state,
        markersOnPage: false,
        loadingSolution: false,
        errors: payload.error
      }
    case FIND_ROUTES:
      return {
        ...state,
        loadingSolution: true,
      }
    case 'GET_SOLUTION_COMPLETE':
      return {
        ...state,
        loadingSolution: false,
        optimized: true,
        solution: payload.data
      }
    default:
      return state;
  }
}

export const fetchFailed = (error) => ({
  type: 'FETCH_FAILED', payload: { error }
});

export const getLocationsComplete = (markers, demands, isComplete = true) => ({
  type: 'GET_LOCATIONS_COMPLETE', payload: { markers, demands, isComplete }
});

export const getSolutionComplete = (data) => ({
  type: 'GET_SOLUTION_COMPLETE', payload: { data }
});

export const getLocations = () => ({
  type: GET_LOCATIONS, payload: {}
});

export const findRoutes = (data) => ({
  type: FIND_ROUTES, payload: { data }
});

export const removeMarkers = () => ({
  type: 'REMOVE_MARKERS',
  payload: {
    markers: []
  }
});

export const initMap = () => ({
  type: 'INIT_MAP',
  payload: {
    initialLocation: {
      lat: -33.8688,
      lng: 151.2093
    },
    zoomLevel: 13,
    markers: [],
    polylines: []
  },
});