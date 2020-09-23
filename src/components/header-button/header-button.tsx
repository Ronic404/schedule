import React, { ReactElement } from 'react';

import { Button } from 'antd';

type HeaderButtonProps = {
    buttonImage: ReactElement,
    handler?: any
}

const HeaderButton = ({ buttonImage, handler } : HeaderButtonProps): ReactElement => (
  <Button type="text" size="large" onClick={handler}>{buttonImage}</Button>
);

export default HeaderButton;
