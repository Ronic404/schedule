import React, { ReactElement } from 'react';

import styles from './style-selector-item.module.css';

type StyleSelectorItemType = {
    text: string,
    color?: string
}

const StyleSelectorItem = ({ text, color }: StyleSelectorItemType): ReactElement => {
    return (
        <div className={styles['style-selector__item']}>
            <span>{text}</span>
            {color === 'Background' ? (
                <span>{color}</span>
            ) : (
                <span style={{background: color}}>{color}</span>
            )}
        </div>
    );
}

export default StyleSelectorItem;
