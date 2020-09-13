import React, { FC, ReactElement } from 'react';

import logo from './logo.svg';
import './App.css';
import MainContainer from './components/main-container';
import Header from './components/header';

import { Layout } from 'antd';
import TableContainer from './components/table-container';

const { Content } = Layout;

const App: FC = (): ReactElement => (
  <Layout>
    <header className="header">
      <Header />
    </header>
    <Content>
      <TableContainer />
    </Content>
  </Layout>
);

export default App;
