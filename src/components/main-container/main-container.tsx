import React, { FC, ReactElement } from 'react';
import Header from '../header';
import TableContainer from '../table-container';

import './main-container.css';

const MainContainer: FC = (): ReactElement => {
    return (
        <section className="container">
            <Header />
            <TableContainer />
        </section>
    );
}

export default MainContainer;
