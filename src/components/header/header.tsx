import React, { FC, ReactElement } from 'react';
import styles from './header.module.css';
import Dropbox from '../dropbox';
import logo from './logo.png';

import {roles, defaultRoleIndex } from './header-data';

const Header: FC = (): ReactElement => {
    return (
        <header className={styles.header}>
            <div className={styles.header__main}>
                <div className={styles.header__logo}>
                    <img src={logo} alt="Rolling Scopes School"/>
                </div>
                <div className={styles['header__top-left']}>
                    <Dropbox items={roles} defaultIndex={defaultRoleIndex} />
                </div>
            </div>
        </header>
    );
}

export default Header;
