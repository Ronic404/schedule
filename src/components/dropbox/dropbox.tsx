import React, { ReactElement } from 'react';
import { IOptionItem } from '../../interfaces';

import { Select } from "antd";

import styles from './dropbox.module.css';

type DropboxProps = {
    items: Array<IOptionItem>,
    defaultIndex: number,
    className?: string
}

const Dropbox = ({ items, defaultIndex, className = '' } : DropboxProps ): ReactElement => {
    const { Option } = Select;
    return (
        <Select defaultValue={items[defaultIndex].name} className={styles['select-location']}>
            {items.map(({name, id}): ReactElement => {
                return (
                    <Option value={name} key={id}>{name}</Option>
                );
            })}
        </Select>
    );
}

export default Dropbox;
