import React, { ReactElement } from 'react';
import { IOptionItem } from '../../interfaces';

import { Select } from "antd";

import './dropbox.css';

type DropboxProps = {
    items: Array<IOptionItem>,
    defaultIndex: number,
    className?: string
}

const Dropbox = ({ items, defaultIndex, className = '' } : DropboxProps ): ReactElement => {
    const { Option } = Select;
    return (
        <Select defaultValue={items[defaultIndex].name} className={className}>
            {items.map(({name, id}): ReactElement => {
                return (
                    <Option value={name} key={id}>{name}</Option>
                );
            })}
        </Select>
    );
}

export default Dropbox;
