import ReactDOM from 'react-dom';
import App from './App';
import {store} from './app/store'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
// import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

