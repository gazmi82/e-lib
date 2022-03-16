import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ReactNotifications />
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
