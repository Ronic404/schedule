import React, { FC, ReactElement } from 'react';

import MainTable from '../main-table';
import { TableContainerProps } from '../../interfaces';

import styles from './table-container.module.css';

const TableContainer: FC<TableContainerProps> = ({
  setTableRef,
}: TableContainerProps): ReactElement => (
  <section className={styles['PDFTable-container']}>
    <MainTable setTableRef={setTableRef} />
  </section>
);

export default TableContainer;
