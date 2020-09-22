import React, { FC, ReactElement, useState } from 'react';
import {
    Modal
} from 'antd';

import { SketchPicker } from 'react-color';

import taskTypes from '../task-types';

import styles from './style-selector.module.css';
import StyleSelectorItem from '../style-selector-item';

const StyleSelector: FC = (): ReactElement => {
    const [state, setState] = useState({
        background: '#fff'
    })
    const handleOk = (): void => {
        console.log('ok')
    }
    const taskTypesData = taskTypes.map((item, id) => {
        return {...item, id}
    })
    const handleCancel = (): void => {
        console.log('cancel')
    }
    const handleChangeComplete = ({hex}: any): void => {
        setState({background: hex})
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
                {taskTypesData.map(({text, color, id}) => {
                    return (
                        <li key={id}><StyleSelectorItem text={text} color={color}/></li>
                    )
                })}
            </ul>
            <div className="color-selector">
                <SketchPicker
                    color={state.background}
                    onChangeComplete={handleChangeComplete} 
                />
            </div>
          </div>
      </Modal>
    );
};

export default StyleSelector;
