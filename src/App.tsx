import React, { FC, ReactElement } from 'react';
import { Provider, connect } from 'react-redux';
import './App.css';
import { Layout } from 'antd';
import Header from './components/header';
import store from './store';

import styles from './App.module.css';

import TableContainer from './components/table-container';
import CreateTask from './components/create-task';
import TableHeader from './components/table-header';
import ListStructure from './components/list-structure';

const { Content } = Layout;

const App: FC = ({ types }:any): ReactElement => {
  console.log(types);

  return (
    <Provider store={store}>
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
    </Provider>
  );
};

const mapStateToProps = (state:any) => ({
  types: state.types.type,
});

export default connect(mapStateToProps)(App);
