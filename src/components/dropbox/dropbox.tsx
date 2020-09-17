import React, { ReactElement } from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import { IOptionItem } from '../../interfaces';
import changeType from '../../actions/change-type';

import styles from './dropbox.module.css';

type DropboxProps = {
    items: Array<IOptionItem>,
    defaultIndex: number,
    componentClassName?: string
}

const Dropbox = ({ items, defaultIndex, componentClassName = '' } : DropboxProps): ReactElement => {
  const { Option } = Select;

  const changeHandler = (el:any):string => {
    console.log(el);
    return el;
  };

  return (
    <Select
      onChange={changeHandler}
      defaultValue={items[defaultIndex].name}
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
};

const mapDispatchToProps = {
  changeType,
};

export default connect(null, mapDispatchToProps)(Dropbox);
