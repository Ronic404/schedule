import React, { FC, ReactElement } from 'react';
import { IOptionItem } from '../../interfaces';

import { Select } from "antd";

import './select-role.css';

const SelectRole: FC = (): ReactElement => {
    const { Option } = Select;
    const menuItems: Array<IOptionItem> = [
        {
            name: 'Student',
            id: 1,
        },
        {
            name: 'Tutor',
            id: 2,
        },
    ];
    return (
        <Select defaultValue={menuItems[0].name}>
            {menuItems.map(({name, id}): ReactElement => {
                return (
                    <Option value={name} key={id}>{name}</Option>
                );
            })}
        </Select>
    );
}

export default SelectRole;
