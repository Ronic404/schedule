import React, { ReactElement } from 'react';
import { IOptionItem } from '../../interfaces';

import { Select } from "antd";

import styles from './dropbox.module.css';

type DropboxProps = {
    items: Array<IOptionItem>,
    defaultIndex: number,
    componentClassName?: string
}

const Dropbox = ({ items, defaultIndex, componentClassName = '' } : DropboxProps ): ReactElement => {
    const { Option } = Select;
    return (
        <Select defaultValue={items[defaultIndex].name} className={styles[componentClassName]}>
            {items.map(({name, id}): ReactElement => {
                return (
                    <Option value={name} key={id}>{name}</Option>
                );
            })}
        </Select>
    );
}

export default Dropbox;
