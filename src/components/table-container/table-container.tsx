import React, { FC, ReactElement } from 'react';

import styles from './table-container.module.css';
import MainTable from '../main-table';
import '../calendar-schedule';

const TableContainer: FC = (): ReactElement => (
  <section className={styles['table-container']}>
    <MainTable />
  </section>
);

export default TableContainer;
