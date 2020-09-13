import React, { ReactElement } from 'react';
import { IOptionItem } from '../../interfaces';

import { Select } from "antd";

import './Dropbox.css';

type DropboxProps = {
    items: Array<IOptionItem>,
    defaultIndex: number,
}

const Dropbox = ({ items, defaultIndex } : DropboxProps ): ReactElement => {
    const { Option } = Select;
    return (
        <Select defaultValue={items[defaultIndex].name}>
            {items.map(({name, id}): ReactElement => {
                return (
                    <Option value={name} key={id}>{name}</Option>
                );
            })}
        </Select>
    );
}

export default Dropbox;
