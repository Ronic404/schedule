import React, { FC, ReactElement, useState } from 'react';
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
import { TableDownloadProps } from './interfaces';
import StyleSelector from './components/style-selector';

import styles from './App.module.css';

const App: FC = ({ types, styleSelectorVisibility }: any): ReactElement => {
  const [tableRef, setTableRef] = useState();
  localStorage.setItem('view type', types);
  let viewTasks: ReactElement;

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
            <Route exact path="/" render={() => <TableContainer setTableRef={(table: TableDownloadProps['PDFTable']) => setTableRef(table)} />} />
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

export default connect(mapStateToProps)(App);
