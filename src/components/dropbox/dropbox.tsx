import React, { ReactElement } from 'react';
import { Select } from 'antd';
import { IOptionItem } from '../../interfaces';

import styles from './dropbox.module.css';

type DropboxProps = {
    items: Array<IOptionItem>,
    defaultIndex: number,
    componentClassName?: string,
    handler?: any,
    userTimeZone?: string,
}

const Dropbox = ({
  items, defaultIndex, userTimeZone, componentClassName = '', handler,
} : DropboxProps): ReactElement => {
  const { Option } = Select;

  return (
    <Select
      onChange={handler}
      defaultValue={userTimeZone || items[defaultIndex].name}
      className={styles[componentClassName]}
    >
      {items.map(({ name, id }): ReactElement => (
        <Option value={name} key={id}>{name}</Option>
      ))}
    </Select>
  );
};

Dropbox.defaultProps = {
  componentClassName: '',
  handler: '',
};

export default Dropbox;
