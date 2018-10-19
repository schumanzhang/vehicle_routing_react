import Loadable from 'react-loadable';
import Loading from '../components/Loading/Loading';

export default Loadable({
  loader: () => import('../containers/SettingsViewContainer'),
  loading: Loading,
});
