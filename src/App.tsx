import React, { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Layout } from 'antd';

import styles from './App.module.css';

import Header from './components/header';
import TableContainer from './components/table-container';
import TableHeader from './components/table-header';
import ListContainer from './components/list-container';
import CalendarSchedule from './components/calendar-schedule';
import CreateTask from './components/create-task';

const { Content } = Layout;

const App: FC = ({ types }:any): ReactElement => {
  let viewTasks;

  switch (types) {
    case 'Table':
      viewTasks = <TableContainer />;
      break;
    case 'List':
      viewTasks = <ListContainer />;
      break;
    case 'Calendar':
      viewTasks = <CalendarSchedule />;
      break;
    case 'Create task':
      viewTasks = <CreateTask />;
      break;
    default:
      viewTasks = <TableContainer />;
  }

  return (
    <Layout>
      <div className={styles.header}>
        <Header />
        <TableHeader />
      </div>
      <Content>
        {viewTasks}
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state:any) => ({
  types: state.types.type,
});

export default connect(mapStateToProps)(App);
