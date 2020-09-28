import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Select } from 'antd';
import { IOptionItem } from '../../interfaces';

import styles from './dropbox.module.css';

type DropboxProps = {
    items: Array<IOptionItem>,
    defaultIndex: number,
    componentClassName?: string,
    handler?: any,
    userTimeZone?: string,// eslint-disable-line
}

const Dropbox = ({
  items, defaultIndex, userTimeZone, componentClassName = '', handler, // eslint-disable-line
} : DropboxProps): ReactElement => {
  const { Option } = Select;

  return (
    <Select
      onChange={handler}
      defaultValue={userTimeZone || items[defaultIndex].name}
      className={styles[componentClassName]}
    >
      {items.map(({ name, id }): ReactElement => (
        <Option value={name} key={id}>
          <Link to={`/${name}`} style={{ width: '100%', display: 'block' }}>{name}</Link>
        </Option>
      ))}
    </Select>
  );
};

Dropbox.defaultProps = {
  componentClassName: '',
  handler: '',
};

export default Dropbox;
