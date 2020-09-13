import React, { FC, ReactElement } from 'react';

import './main-container.css';

const MainContainer: FC = (): ReactElement => {
    return (
        <section className="container">
            <header className="header">
                <div className="header__top">
                    <div className="header__logo">

                    </div>
                    <div className="header__dropbox-role dropbox">

                    </div>
                </div>
                <div className="header__bottom">
                    <div className="header__bottom-left">
                        <div className="header__dropbox-location dropbox"></div>
                        <div className="header__dropbox-display dropbox"></div>
                        <div className="header__dropbox-style dropbox"></div>
                    </div>
                    <div className="header__bottom-right">
                        <div className="header__download">

                        </div>
                    </div>
                </div>
            </header>
            <section className="table-container"></section>
        </section>
    );
}

export default MainContainer;
