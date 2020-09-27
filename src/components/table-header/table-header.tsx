/* eslint-disable no-shadow */
import React, { useState, FC, ReactElement } from 'react';
import { connect } from 'react-redux';

import { EyeOutlined, BgColorsOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './table-header.module.css';
import Dropbox from '../dropbox';
import DropboxRoute from '../dropbox-route';
import {
  changeType,
  changeTimezone,
  changeStyleSelectorVisibility,
} from '../../actions';
import HeaderButton from '../header-button/header-button';
import TableDownloadModal from '../table-download-modal';
import {
  locations,
  displays,
  defaultDisplayIndex,
  courses,
  defaultLocationIndex,
  defaultCourseIndex,
} from './table-header-data';

type PropType = {
  changeType: any,
  changeTimezone: any,
  changeStyleSelectorVisibility: any,
  tableRef: any,
}

const TableHeader: FC<any> = ({
  changeType,
  changeTimezone,
  changeStyleSelectorVisibility,
  tableRef,
}: PropType): ReactElement => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [timeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const typeChange = (el: any): void => {
    changeType(el);
  };

  const timezoneChange = (el: any): void => {
    changeTimezone(el);
  };

  const styleSelectorVisibilityChange = (value: boolean): void => {
    changeStyleSelectorVisibility(value);
  };

  return (
    <div className={styles.table__header}>
      <div className={styles['table__header-left']}>
        <Dropbox
          handler={timezoneChange}
          userTimeZone={timeZone}
          componentClassName="select-location"
          items={locations}
          defaultIndex={defaultLocationIndex}
        />
        <DropboxRoute handler={typeChange} items={displays} defaultIndex={defaultDisplayIndex} />
        <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
        <HeaderButton
          buttonImage={<BgColorsOutlined />}
          onClick={() => { styleSelectorVisibilityChange(true); }}
        />
      </div>
      <div className={styles['table__header-right']}>
        <HeaderButton buttonImage={<EyeOutlined />} />
        <HeaderButton
          buttonImage={<DownloadOutlined />}
          onClick={() => setShowDownloadModal(true)}
        />
        <TableDownloadModal
          visible={showDownloadModal}
          setVisible={((visible) => setShowDownloadModal(visible))}
          PDFTable={tableRef}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  changeType, changeTimezone, changeStyleSelectorVisibility,
};

export default connect(null, mapDispatchToProps)(TableHeader);
