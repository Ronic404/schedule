import React, { FC, ReactElement } from 'react';
import styles from './table-header.module.css';
import Dropbox from '../dropbox';

import { locations, defaultLocationIndex, displays, defaultDisplayIndex, courses, defaultCourseIndex } from './table-header-data';

import { EyeOutlined, BgColorsOutlined, DownloadOutlined } from '@ant-design/icons';
import HeaderButton from '../header-button/header-button';

const TableHeader: FC = (): ReactElement => {
    return (
        <div className={styles['table__header']}>
            <div className={styles['table__header-left']}>
                <Dropbox componentClassName='select-location' items={locations} defaultIndex={defaultLocationIndex} />
                <Dropbox items={displays} defaultIndex={defaultDisplayIndex} />
                <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
                <HeaderButton buttonImage={<BgColorsOutlined />}/>
            </div>
            <div className={styles['table__header-right']}>
                <HeaderButton buttonImage={<EyeOutlined />}/>
                <HeaderButton buttonImage={<DownloadOutlined />}/>
            </div>
        </div>
    );
}

export default TableHeader;
