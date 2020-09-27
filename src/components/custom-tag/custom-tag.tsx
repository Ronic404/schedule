import React, { ReactElement } from 'react';
import { Tag } from 'antd';

type CustomTagType = {
    backgroundColor?: string,
    color?: string,
    text: string
}

const CustomTag = ({ backgroundColor, color, text }: CustomTagType): ReactElement => {
    return (
        <Tag color={backgroundColor} style={{color: color}}>
            {text}
        </Tag>
    );
} 

CustomTag.defaultProps = {
    backgroundColor: 'magenta',
    color: '#000000'
}

export default CustomTag;
