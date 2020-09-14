import React, { FC, ReactElement } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Layout } from 'antd';
import Header from './components/header';
import MainTable from './components/table';
import TableContainer from './components/table-container';
import CreateTask from './components/create-task';

const { Content } = Layout;

const App: FC = (): ReactElement => (
  <Layout>
    <Header />
    <Content>
      <TableContainer />
      <MainTable />
    </Content>
    <CreateTask />
  </Layout>
);

export default App;
