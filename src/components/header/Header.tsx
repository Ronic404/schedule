import React, { FC, ReactElement } from 'react';
import {IOptionItem} from '../../interfaces';
import './header.css';
import Dropbox from '../dropbox';
import StyleSelector from '../style-selector';
import Download from '../download';
import logo from './logo.png';
import Accessibility from '../accessibility';

const Header: FC = (): ReactElement => {
    const roles: Array<IOptionItem> = [
        {
            name: 'Student',
            id: 1,
        },
        {
            name: 'Mentor',
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
    const courses: Array<IOptionItem> = [
        {
            name: 'RSS react 2020 Q3',
            id: 1,
        },
        {
            name: 'RSS 2020 Q1',
            id: 2,
        },
        {
            name: 'RSS angular 2020 Q3',
            id: 3,
        },
        {
            name: 'RSS node js 2020 Q3',
            id: 4,
        },
    ]
    const defaultCourseIndex = 0;
    return (
        <>
            <div className="header__top">
                <div className="header__logo">
                    <img src={logo} alt="Rolling Scopes School"/>
                </div>
                <div className="header__top-left">
                    <Accessibility />
                    <Dropbox items={roles} defaultIndex={defaultRoleIndex} />
                </div>
            </div>
            <div className="header__bottom">
                <div className="header__bottom-left">
                    <Dropbox className="select-location" items={locations} defaultIndex={defaultLocationIndex} />
                    <Dropbox items={displays} defaultIndex={defaultDisplayIndex} />
                    <Dropbox items={courses} defaultIndex={defaultCourseIndex} />
                    <StyleSelector />
                </div>
                <div className="header__bottom-right">
                    <Download />
                </div>
            </div>
        </>
    );
}

export default Header;
