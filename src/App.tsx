import React, { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Layout } from 'antd';

import styles from './App.module.css';

import Header from './components/header';
import TableContainer from './components/table-container';
import CreateTask from './components/create-task';
import TableHeader from './components/table-header';
import ListStructure from './components/list-structure';

const { Content } = Layout;

const App: FC = ({ types }:any): ReactElement => {
  console.log(`Этот тип передаётся в APP: ${types}`);

  return (
    <Layout>
      <div className={styles.header}>
        <Header />
        <TableHeader />
      </div>
      <Content>
        <TableContainer />
        <ListStructure />
        <CreateTask />
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state:any) => ({
  types: state.types.type,
});

export default connect(mapStateToProps)(App);
