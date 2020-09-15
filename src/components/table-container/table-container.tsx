import React, { FC, ReactElement } from 'react';

import styles from './table-container.module.css';

const TableContainer: FC = (): ReactElement => (
  <section className={styles['table-container']}>
    Table
  </section>
);

export default TableContainer;
