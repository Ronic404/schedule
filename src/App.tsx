/* eslint-disable no-shadow */
import React, {
  FC, ReactElement, useState, useEffect,
} from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter, Switch, Route,
} from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/header';
import TableContainer from './components/table-container';
import TableHeader from './components/table-header';
import ListContainer from './components/list-container';
import CalendarSchedule from './components/calendar-schedule';
import CreateTask from './components/create-task';
import StyleSelector from './components/style-selector';

import { eventsLoaded } from './actions';
import { compose } from './utils';
import withScheduleService from './components/hoc';
import { TableDownloadProps } from './interfaces';
import styles from './App.module.css';

type PropType = {
  types: any,
  scheduleService: any,
  eventsLoaded: any,
  styleSelectorVisibility: any,
};

const App: FC<PropType> = ({
  types, scheduleService, eventsLoaded, styleSelectorVisibility,
}: PropType): ReactElement => {
  const [tableRef, setTableRef] = useState();
  localStorage.setItem('view type', types);
  let viewTasks: ReactElement;

  useEffect(() => {
    scheduleService.getAllEvents()
      .then((res: any) => {
        eventsLoaded(res);
      });
  }, [scheduleService, eventsLoaded]);

  switch (types) {
    case 'Table':
      viewTasks = (
        <TableContainer
          setTableRef={(table: TableDownloadProps['PDFTable']) => setTableRef(table)}
        />
      );
      break;
    case 'List':
      viewTasks = <ListContainer />;
      break;
    case 'Calendar':
      viewTasks = <CalendarSchedule />;
      break;
    default:
      viewTasks = (
        <TableContainer
          setTableRef={(table: TableDownloadProps['PDFTable']) => setTableRef(table)}
        />
      );
  }

  return (
    <BrowserRouter>
      <Layout>
        <div className={styles.header}>
          <Header />
          <TableHeader tableRef={tableRef} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => <TableContainer setTableRef={(table: TableDownloadProps['PDFTable']) => setTableRef(table)} />}
            />
            <Route path={`/${types}`} render={() => viewTasks} />
            <Route path="/task" render={() => <CreateTask />} />
          </Switch>
          <StyleSelector visibility={styleSelectorVisibility} />
        </div>
      </Layout>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: any) => ({
  types: state.type,
  styleSelectorVisibility: state.styleSelectorVisibility,
});

const mapDispatchToProps = {
  eventsLoaded,
};

export default compose(
  withScheduleService(),
  connect(mapStateToProps, mapDispatchToProps),
)(App);
