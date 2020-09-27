import React, { ReactElement } from 'react';
import { Tag } from 'antd';

type CustomTagType = {
    backgroundColor?: string,
    color?: string,
    text: string,
    tagClassName?: string
}

const CustomTag = ({ backgroundColor, color, text, tagClassName }: CustomTagType): ReactElement => {
    return (
        <Tag color={backgroundColor} style={{color: color}} className={tagClassName}>
            {text}
        </Tag>
    );
} 

CustomTag.defaultProps = {
    backgroundColor: 'magenta',
    color: '#000000',
    tagClassName: ''
}

export default CustomTag;
