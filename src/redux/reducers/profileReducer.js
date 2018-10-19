import merge from 'ramda/src/merge';

const initialState = {
  profile: null
};

export default (state=initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'something':
      return merge(state, { isRequesting: payload.isRequesting });
    default:
      return state;
  }
}