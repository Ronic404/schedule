import React, { ReactElement } from 'react';
import { Select } from 'antd';
import { IOptionItem } from '../../interfaces';
import styles from './dropbox.module.css';

type DropboxProps = {
    items: Array<IOptionItem>,
    userTimeZone?: string,
    defaultIndex:number,
    componentClassName?: string
}

const Dropbox = ({ items, userTimeZone, componentClassName = '', defaultIndex,} : DropboxProps): ReactElement => {
  const { Option } = Select;
  return (
    <Select 
    //onChange={} 
    defaultValue={userTimeZone?userTimeZone:items[defaultIndex].name} className={styles[componentClassName]}>
      {items.map(({ name, id }): ReactElement => (
        <Option value={name} key={id}>{name}</Option>
      ))}
    </Select>
  );
};

Dropbox.defaultProps = {
  componentClassName: '',
};

export default Dropbox;
