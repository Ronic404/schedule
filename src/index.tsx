import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import ErrorBoundary from './components/error-boundary';
import ScheduleService from './services/schedule-service';
import { ScheduleServiceProvider } from './components/schedule-service-context';
import store from './store';

import * as serviceWorker from './serviceWorker';
import './index.css';

const scheduleService = new ScheduleService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <ScheduleServiceProvider value={scheduleService}>
        <Router>
          <App />
        </Router>
      </ScheduleServiceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
