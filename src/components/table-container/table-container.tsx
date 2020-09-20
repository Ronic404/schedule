import React, { FC, ReactElement } from 'react';

import styles from './table-container.module.css';
import MainTable from '../main-table';
<<<<<<< HEAD
import '../calendar-schedule';
=======
import TableForMentor from '../table-for-mentor';
>>>>>>> develop

const TableContainer: FC = (): ReactElement => (
  <section className={styles['table-container']}>
    <MainTable />
    <TableForMentor />
  </section>
);

export default TableContainer;
