import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import restoreTaskTypes from './utils/restoreTaskTypes';
import App from './App';
import ErrorBoundary from './components/error-boundary';
import ScheduleService from './services/schedule-service';
import { ScheduleServiceProvider } from './components/schedule-service-context';
import store from './store';

import './index.css';

if (localStorage.getItem('taskTypes') && localStorage.getItem('textColor')) {
  restoreTaskTypes();
}

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
