import React, { FC, ReactElement, useState } from 'react';
import { EyeOutlined, BgColorsOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './table-header.module.css';
import Dropbox from '../dropbox';

import {
  locations,
  defaultLocationIndex,
  displays,
  defaultDisplayIndex,
  courses,
  defaultCourseIndex,
} from './table-header-data';

import HeaderButton from '../header-button/header-button';
import TableDownloadModal from '../table-download-modal/table-download-modal';

const TableHeader: FC<any> = ({
  tableRef,
}): ReactElement => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <div className={styles.table__header}>
      <div className={styles['table__header-left']}>
        <Dropbox componentClassName="select-location" items={locations} defaultIndex={defaultLocationIndex} />
        <Dropbox items={displays} defaultIndex={defaultDisplayIndex} />
        <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
        <HeaderButton buttonImage={<BgColorsOutlined />} />
      </div>
      <div className={styles['table__header-right']}>
        <HeaderButton buttonImage={<EyeOutlined />} />
        <HeaderButton buttonImage={<DownloadOutlined />} onClick={() => setShowDownloadModal(true)} />
        <TableDownloadModal
          visible={showDownloadModal}
          setVisible={((visible) => setShowDownloadModal(visible))}
          PDFTable={tableRef}
        />
      </div>
    </div>
  );
};

export default TableHeader;
