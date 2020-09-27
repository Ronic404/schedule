/* eslint-disable no-shadow */
import React, { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import styles from './header.module.css';
import Dropbox from '../dropbox';
import logo from './logo.png';
import { changeRole } from '../../actions';

import { roles, defaultRoleIndex } from './header-data';

const Header: FC = ({ changeRole }: any): ReactElement => {
  const roleChange = (el: any): void => {
    changeRole(el);
  };

  return (
    <header>
      <div className={styles.header__main}>
        <div className={styles.header__logo}>
          <img src={logo} alt="Rolling Scopes School" />
        </div>
        <div>
          <Dropbox handler={roleChange} items={roles} defaultIndex={defaultRoleIndex} />
        </div>
      </div>
    </header>
  );
};

const mapDispatchToProps = {
  changeRole,
};

export default connect(null, mapDispatchToProps)(Header);