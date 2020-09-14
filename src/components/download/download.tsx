import React, { FC, ReactElement } from 'react';

import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

const Download: FC = (): ReactElement => {
    return (
        <Button type="text" size="large"><DownloadOutlined/></Button>
    );
}

export default Download;
