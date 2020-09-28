import React, { FC, ReactElement } from 'react';

import MainTable from '../main-table';
import TableForMentor from '../table-for-mentor';
import { TableContainerProps } from '../../interfaces';

import styles from './table-container.module.css';

const TableContainer: FC<TableContainerProps> = ({
  setTableRef,
}: TableContainerProps): ReactElement => (
  <section className={styles['PDFTable-container']}>
    <MainTable setTableRef={setTableRef} />
    <TableForMentor />
  </section>
);

export default TableContainer;
