import React, { FC, ReactElement } from 'react';

import styles from './table-container.module.css';
import MainTable from '../main-table';
import { TableDownloadProps } from '../../interfaces';

export interface TableContainerProps {
  setTableRef: (component: TableDownloadProps['PDFTable']) => void;
}

const TableContainer: FC<TableContainerProps> = ({
  setTableRef,
}): ReactElement => (
  <section className={styles['PDFTable-container']}>
    <MainTable setTableRef={setTableRef} />
  </section>
);

export default TableContainer;
