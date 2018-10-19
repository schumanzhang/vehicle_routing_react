import { sagaMiddleware } from '../middleware';
import rootSaga from './rootSaga';

export default () => {
  sagaMiddleware.run(rootSaga);
};