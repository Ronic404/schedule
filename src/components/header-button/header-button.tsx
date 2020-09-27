<<<<<<< HEAD
import React, { ReactElement } from 'react';

import { Button } from 'antd';

type HeaderButtonProps = {
    buttonImage: ReactElement,
    handler?: any
}

const HeaderButton = ({ buttonImage, handler } : HeaderButtonProps): ReactElement => (
  <Button type="text" size="large" onClick={handler}>{buttonImage}</Button>
);

HeaderButton.defaultProps = {
  handler: null,
};

export default HeaderButton;
=======
/* eslint-disable react/require-default-props */
import React, { ReactElement } from 'react';

import { Button } from 'antd';

type HeaderButtonProps = {
  buttonImage: ReactElement;
  onClick?: () => void;
}

const HeaderButton = ({ buttonImage, onClick } : HeaderButtonProps): ReactElement => (
  <Button type="text" size="large" onClick={onClick}>{buttonImage}</Button>
);

export default HeaderButton;
>>>>>>> develop
