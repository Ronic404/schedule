import React, { FC, ReactElement } from 'react';
import {
    Modal
} from 'antd';

import { SketchPicker } from 'react-color';

import taskTypes from '../task-types';

import styles from './style-selector.module.css';
import StyleSelectorItem from '../style-selector-item';

const StyleSelector: FC = (): ReactElement => {
    const handleOk = (): void => {
        console.log('ok')
    }
    const taskTypesData = taskTypes.map((item, id) => {
        return {...item, id}
    })
    const handleCancel = (): void => {
        console.log('cancel')
    }
    const styleSelectorItemHeader = {
        text: 'Type',
        color: 'Background'
    }
    return (
        <Modal
        title="Select Styles"
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
          <div className={styles['modal-container']}>
            <ul className={styles['style-selector__list']}>
                <li><StyleSelectorItem {...styleSelectorItemHeader} /></li>
                {taskTypesData.map(({text, color, id}) => {
                    return (
                        <li key={id}><StyleSelectorItem text={text} color={color}/></li>
                    )
                })}
            </ul>
            <div className="color-selector">
                <SketchPicker onChangeComplete={(a) => console.log(a)}/>
            </div>
          </div>
      </Modal>
    );
};

export default StyleSelector;
