import React, { FC, ReactElement } from 'react';
import SelectLocation from '../select-location';
import './Header.css';

const Header: FC = (): ReactElement => {
    return (
        <header className="header">
            <div className="header__top">
                <div className="header__logo">
                </div>
                <div className="header__dropbox-role dropbox">
                    dropbox-role
                </div>
            </div>
            <div className="header__bottom">
                <div className="header__bottom-left">
                    <SelectLocation />
                    <div className="header__dropbox-display dropbox">
                        dropbox-display
                    </div>
                    <div className="header__dropbox-style dropbox">
                        dropbox-style
                    </div>
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
