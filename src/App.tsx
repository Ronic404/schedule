import React, { FC, ReactElement } from 'react';
import './App.css';
import { Layout } from 'antd';
import Header from './components/header';

import TableContainer from './components/table-container';
import CreateTask from './components/create-task';
import ListStructure from './components/list-structure';

const { Content } = Layout;

const App: FC = (): ReactElement => (
  <Layout>
    <Header />
    <Content>
      <TableContainer />
    </Content>
    <CreateTask />
    <ListStructure />
  </Layout>
);

export default App;
