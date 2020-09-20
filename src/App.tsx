import React, { FC, ReactElement, useState } from 'react';
import './App.css';
import { Layout } from 'antd';
import Header from './components/header';

import styles from './App.module.css';

import TableContainer from './components/table-container';
import CreateTask from './components/create-task';
import TableHeader from './components/table-header';
import { TableDownloadProps } from './components/table-download-modal/table-download-modal';

const { Content } = Layout;

const App: FC = (): ReactElement => {
  const [tableRef, setTableRef] = useState();

  return (<Layout>
    <div className={styles.header}>
      <Header />
      <TableHeader tableRef={tableRef} />
    </div>
    <Content>
      <TableContainer setTableRef={(table: TableDownloadProps['PDFTable']) => setTableRef(table)} />
      <CreateTask />
    </Content>
  </Layout>);
};

export default App;
