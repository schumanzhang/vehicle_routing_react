import {
  put,
  all,
  call,
  takeLatest,
} from 'redux-saga/effects';


import {
  GET_LOCATIONS,
  FIND_ROUTES,
  getLocationsComplete,
  getSolutionComplete,
  fetchFailed
} from '../reducers/appReducer';

const URL = 'http://localhost:8000/routing/api';

function* getLocations() {
  try {
    const response = yield call(fetch, URL + '/generate');
    const responseBody = yield response.json();
    yield put(getLocationsComplete(responseBody.coordinates, responseBody.demands));
  } catch (e) {
    yield put(fetchFailed(e));
  }
}

function* getSolution({ payload: { data } }) {
  console.log('data:', data);
  try {
    const response = yield call(fetch, URL + '/cvrp', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    const responseBody = yield response.json();
    console.log('getSolution:', responseBody);
    yield put(getSolutionComplete(responseBody));
  } catch(e) {
    yield put(fetchFailed(e));
  }
}

export default function* routeSaga() {
  yield all([
    takeLatest(GET_LOCATIONS, getLocations),
    takeLatest(FIND_ROUTES, getSolution),
  ]);
}