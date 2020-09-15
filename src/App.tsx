import React, { FC, ReactElement } from 'react';
import './App.css';
import { Layout } from 'antd';
import Header from './components/header';

import styles from './App.module.css';

import TableContainer from './components/table-container';
import CreateTask from './components/create-task';
import TableHeader from './components/table-header';

const { Content } = Layout;

const App: FC = (): ReactElement => (
  <Layout>
    <div className={styles.header}>
      <Header />
      <TableHeader />
    </div>
    <Content>
      <TableContainer />
      <CreateTask />
    </Content>
  </Layout>
);

export default App;
