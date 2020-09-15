import React, { ReactElement } from 'react';
import { Select } from 'antd';
import { IOptionItem } from '../../interfaces';

import styles from './dropbox.module.css';

type DropboxProps = {
  items: Array<IOptionItem>,
  defaultIndex: number,
}

const Dropbox = ({ items, defaultIndex }: DropboxProps): ReactElement => {
  const { Option } = Select;
  return (
    <Select defaultValue={items[defaultIndex].name} className={styles['select-location']}>
      {items.map(({ name, id }): ReactElement => (
        <Option value={name} key={id}>{name}</Option>
      ))}
    </Select>
  );
};

export default Dropbox;
