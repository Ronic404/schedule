import React, { FC, ReactElement } from 'react';
import {IOptionItem} from '../../interfaces';
import './Header.css';
import Dropbox from '../dropbox';
import StyleSelector from '../style-selector';

const Header: FC = (): ReactElement => {
    const roles: Array<IOptionItem> = [
        {
            name: 'Student',
            id: 1,
        },
        {
            name: 'Tutor',
            id: 2,
        },
    ];
    const defaultRoleIndex = 0;

    const locations: Array<IOptionItem> = [
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
    const defaultLocationIndex = 3;
    const displays: Array<IOptionItem> = [
        {
            name: 'Table',
            id: 1
        },
        {
            name: 'List',
            id: 2
        },
        {
            name: 'Calendar',
            id: 3
        },
    ];
    const defaultDisplayIndex = 0;
    return (
        <header className="header">
            <div className="header__top">
                <div className="header__logo">
                </div>
                <Dropbox items={roles} defaultIndex={defaultRoleIndex} />
            </div>
            <div className="header__bottom">
                <div className="header__bottom-left">
                    <Dropbox items={locations} defaultIndex={defaultLocationIndex} />
                    <Dropbox items={displays} defaultIndex={defaultDisplayIndex} />
                    <StyleSelector />
                </div>
                <div className="header__bottom-right">
                    <div className="header__download">
                        download
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
