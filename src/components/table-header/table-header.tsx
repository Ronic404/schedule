import React, { useState, FC, ReactElement } from 'react';
import { EyeOutlined, BgColorsOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './table-header.module.css';
import Dropbox from '../dropbox';
import moment from 'moment-timezone'; 

import {
  locations,
  displays,
  defaultDisplayIndex,
  courses,
  defaultLocationIndex,
  defaultCourseIndex,
} from './table-header-data';

import HeaderButton from '../header-button/header-button';

const TableHeader: FC = (): ReactElement => {
  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  return(
  <div className={styles.table__header}>
    <div className={styles['table__header-left']}>
      <Dropbox userTimeZone={timeZone} 
      //onChange={setTimeZone}
      defaultIndex={defaultLocationIndex}
       componentClassName="select-location" items={locations} />
      <Dropbox items={displays} defaultIndex={defaultDisplayIndex} />
      <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
      <HeaderButton buttonImage={<BgColorsOutlined />} />
    </div>
    <div className={styles['table__header-right']}>
      <HeaderButton buttonImage={<EyeOutlined />} />
      <HeaderButton buttonImage={<DownloadOutlined />} />
    </div>
  </div>)
};

export default TableHeader;
