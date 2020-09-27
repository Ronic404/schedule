import React, { ReactElement } from 'react';

import styles from './style-selector-item.module.css';

type StyleSelectorItemType = {
    text: string,
    color?: string,
    onColorPick: any
}

const StyleSelectorItem = ({ text, color, onColorPick }: StyleSelectorItemType): ReactElement => {
  const colorStyles = {
    width: '26px',
    height: '26px',
    backgroundColor: color,
    display: 'inline-block',
    borderRadius: '50%',
  };
  return (
    <div className={styles['style-selector__item']}>
      <span>{text}</span>
      {/* eslint-disable-next-line */}
      <span style={colorStyles} onClick={onColorPick} data-color={color} />
    </div>
  );
};

StyleSelectorItem.defaultProps = {
  color: '#000000',
};

export default StyleSelectorItem;
