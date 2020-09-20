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
