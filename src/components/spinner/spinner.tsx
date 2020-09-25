import React, { FC, ReactElement } from 'react';

import styles from './spinner.module.css';

const Spinner: FC = (): ReactElement => (
  <div className={styles.Spinner}>Loading...</div>
);

export default Spinner;
