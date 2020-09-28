import React, { FC, ReactElement } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import styles from './spinner.module.css';

const Spinner: FC = (): ReactElement => (
  <div className={styles.spinner}>
    <LoadingOutlined />
  </div>
);

export default Spinner;
