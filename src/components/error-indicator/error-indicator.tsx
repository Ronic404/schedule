import React, { FC, ReactElement } from 'react';

import styles from './error-indicator.module.css';

const ErrorIndicator: FC = (): ReactElement => (
  <div className={styles.ErrorIndicator}>Error!</div>
);

export default ErrorIndicator;
