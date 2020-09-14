import React, { FC, ReactElement } from 'react';
import {IOptionItem} from '../../interfaces';
import styles from './header.module.css';
import Dropbox from '../dropbox';
import StyleSelector from '../style-selector';
import Download from '../download';
import logo from './logo.png';
import Accessibility from '../accessibility';

import {roles, defaultRoleIndex, locations, defaultLocationIndex, displays, defaultDisplayIndex, courses, defaultCourseIndex } from './header-data';

const Header: FC = (): ReactElement => {
    return (
        <header className={styles.header}>
            <div className={styles.header__top}>
                <div className={styles.header__logo}>
                    <img src={logo} alt="Rolling Scopes School"/>
                </div>
                <div className={styles['header__top-left']}>
                    <Accessibility />
                    <Dropbox items={roles} defaultIndex={defaultRoleIndex} />
                </div>
            </div>
            <div className={styles['header__bottom']}>
                <div className={styles['header__bottom-left']}>
                    <Dropbox className='select-location' items={locations} defaultIndex={defaultLocationIndex} />
                    <Dropbox items={displays} defaultIndex={defaultDisplayIndex} />
                    <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
                    <StyleSelector />
                </div>
                <div className={styles['header__bottom-right']}>
                    <Download />
                </div>
            </div>
        </header>
    );
}

export default Header;
