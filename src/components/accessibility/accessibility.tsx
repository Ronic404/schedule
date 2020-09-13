import React, { FC, ReactElement } from 'react';

import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import './accessibility.css';

const Accessibility: FC = (): ReactElement => {
    return (
        <Button type="text" size="large"><EyeOutlined /></Button>
    );
}

export default Accessibility;