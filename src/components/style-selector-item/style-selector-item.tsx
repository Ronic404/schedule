import React, { ReactElement } from 'react';

import styles from './style-selector-item.module.css';

type StyleSelectorItemType = {
    text: string,
    color?: string
}

const StyleSelectorItem = ({ text, color }: StyleSelectorItemType): ReactElement => {
    console.log(styles)
    const colorStyles = {
        width: '26px',
        height: '26px',
        'background-color': color,
        display: 'inline-block',
        'border-radius': '50%'
    }
    return (
        <div className={styles['style-selector__item']}>
            <span>{text}</span>
            <span style={colorStyles} />
        </div>
    );
}

export default StyleSelectorItem;
