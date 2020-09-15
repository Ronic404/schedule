import React, { FC, ReactElement } from 'react';
import { EyeOutlined, BgColorsOutlined, DownloadOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import Dropbox from '../dropbox';
import logo from './logo.png';

import {
  roles,
  defaultRoleIndex,
  locations,
  defaultLocationIndex,
  displays,
  defaultDisplayIndex,
  courses,
  defaultCourseIndex,
} from './header-data';

import HeaderButton from '../header-button/header-button';

const Header: FC = (): ReactElement => (
  <header className={styles.header}>
    <div className={styles.header__top}>
      <div className={styles.header__logo}>
        <img src={logo} alt="Rolling Scopes School" />
      </div>
      <div className={styles['header__top-left']}>
        <HeaderButton buttonImage={<EyeOutlined />} />
        <Dropbox items={roles} defaultIndex={defaultRoleIndex} />
      </div>
    </div>
    <div className={styles.header__bottom}>
      <div className={styles['header__bottom-left']}>
        <Dropbox items={locations} defaultIndex={defaultLocationIndex} />
        <Dropbox items={displays} defaultIndex={defaultDisplayIndex} />
        <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
        <HeaderButton buttonImage={<BgColorsOutlined />} />
      </div>
      <div className={styles['header__bottom-right']}>
        <HeaderButton buttonImage={<DownloadOutlined />} />
      </div>
    </div>
  </header>
);

export default Header;
