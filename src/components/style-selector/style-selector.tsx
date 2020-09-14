import React, { FC, ReactElement } from 'react';

import { Button } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

const StyleSelector: FC = (): ReactElement => {
    return (
        <Button type="text" size="large"><BgColorsOutlined /></Button>
    );
}

export default StyleSelector;
