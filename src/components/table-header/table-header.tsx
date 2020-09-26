import React, { useState, FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { EyeOutlined, BgColorsOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './table-header.module.css';
import Dropbox from '../dropbox';
import {
  changeType,
  changeTimezone,
  changeStyleSelectorVisibility,
} from '../../actions';
import HeaderButton from '../header-button/header-button';
import {
  locations,
  displays,
  defaultDisplayIndex,
  courses,
  defaultLocationIndex,
  defaultCourseIndex,
} from './table-header-data';
// eslint-disable-next-line
const TableHeader: FC<any> = ({ changeType, changeTimezone, changeStyleSelectorVisibility }): ReactElement => {
  const typeChange = (el:any):void => {
    changeType(el);
  };

  const timezoneChange = (el:any):void => {
    changeTimezone(el);
  };

  const styleSelectorVisibilityChange = (): void => {
    changeStyleSelectorVisibility(true);
  };

  const [timeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <div className={styles.table__header}>
      <div className={styles['table__header-left']}>
        <Dropbox handler={timezoneChange} userTimeZone={timeZone} componentClassName="select-location" items={locations} defaultIndex={defaultLocationIndex} />
        <Dropbox handler={typeChange} items={displays} defaultIndex={defaultDisplayIndex} />
        <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
        <HeaderButton handler={styleSelectorVisibilityChange} buttonImage={<BgColorsOutlined />} />
      </div>
      <div className={styles['table__header-right']}>
        <HeaderButton buttonImage={<EyeOutlined />} />
        <HeaderButton buttonImage={<DownloadOutlined />} />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  changeType, changeTimezone, changeStyleSelectorVisibility,
};

export default connect(null, mapDispatchToProps)(TableHeader);
