import React, { FC, ReactElement } from 'react';

import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import './Download.css';

const Download: FC = (): ReactElement => {
    return (
        <Button><DownloadOutlined /></Button>
    );
}

export default Download;
