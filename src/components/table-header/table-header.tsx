import React, { useState, FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { EyeOutlined, BgColorsOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './table-header.module.css';
import Dropbox from '../dropbox';
import changeType from '../../actions/change-type';
import changeTimezone from '../../actions/change-timezone';
import moment from 'moment-timezone'; 
import HeaderButton from '../header-button/header-button';
import {
  locations,
  displays,
  defaultDisplayIndex,
  courses,
  defaultLocationIndex,
  defaultCourseIndex,
} from './table-header-data';

const TableHeader: FC<any> = ({ changeType,changeTimezone }): ReactElement => {
  const typeChange = (el:any):void => {
    changeType(el);
  };

  const timezoneChange = (el:any):void => {
   changeTimezone(el);
  };

  const [timeZone, setTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <div className={styles.table__header}>
      <div className={styles['table__header-left']}>
        <Dropbox handler={timezoneChange}  userTimeZone={timeZone}  componentClassName="select-location" items={locations} defaultIndex={defaultLocationIndex} />
        <Dropbox handler={typeChange} items={displays} defaultIndex={defaultDisplayIndex} />
        <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
        <HeaderButton buttonImage={<BgColorsOutlined />} />
      </div>
      <div className={styles['table__header-right']}>
        <HeaderButton buttonImage={<EyeOutlined />} />
        <HeaderButton buttonImage={<DownloadOutlined />} />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  changeType,changeTimezone,
};

// const mapDispatchToProps = (dispatch: any) => ({
//   change: (newType: string) => {
//     dispatch(changeType);
//   },
// });

export default connect(null, mapDispatchToProps)(TableHeader);