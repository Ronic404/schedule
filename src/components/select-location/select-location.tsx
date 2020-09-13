import React, { FC, ReactElement } from 'react';
import { IOptionItem } from '../../interfaces';

import { Select } from "antd";

import './select-location.css';

const SelectLocation: FC = (): ReactElement => {
    const { Option } = Select;
    const menuItems: Array<IOptionItem> = [
        {
            name: 'Europe/London',
            id: 1,
        },
        {
            name: 'Europe/Warsaw',
            id: 2,
        },
        {
            name: 'Europe/Kiev',
            id: 3,
        },
        {
            name: 'Europe/Minsk',
            id: 4,
        },
        {
            name: 'Europe/Moscow',
            id: 5,
        },
        {
            name: 'Europe/Volgograd',
            id: 6,
        },
        {
            name: 'Europe/Yekaterinburg',
            id: 7,
        },
        {
            name: 'Europe/Tashkent',
            id: 8,
        },
        {
            name: 'Europe/Tbilisi',
            id: 9,
        },
    ];
    return (
        <Select defaultValue={menuItems[3].name}>
            {menuItems.map(({name, id}): ReactElement => {
                return (
                    <Option value={name} key={id}>{name}</Option>
                );
            })}
        </Select>
    );
}

export default SelectLocation;
