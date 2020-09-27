import React, { FC, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
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
import { changeStyleSelectorVisibility } from './actions';

const App: FC = ({ types, styleSelectorVisibility }: any): ReactElement => {
  const [tableRef, setTableRef] = useState();

  let viewTasks;

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
    case 'Create task':
      viewTasks = <CreateTask />;
      break;
    default:
      viewTasks = (
        <TableContainer
          setTableRef={(table: TableDownloadProps['PDFTable']) => setTableRef(table)}
        />
      );
  }
  return (
    <Layout>
      <div className={styles.header}>
        <Header />
        <TableHeader tableRef={tableRef} />
        {viewTasks}
        <StyleSelector visibility={styleSelectorVisibility} />
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  types: state.types.type,
  styleSelectorVisibility: state.styleSelectorVisibility.styleSelectorVisibility,
});

export default connect(mapStateToProps)(App);
