import React, { FC, ReactElement } from 'react';

import styles from './table-container.module.css';
import MainTable from '../main-table';
import TableForMentor from '../table-for-mentor';

const TableContainer: FC = (): ReactElement => (
  <section className={styles['table-container']}>
    <MainTable />
    <TableForMentor />
  </section>
);

export default TableContainer;
