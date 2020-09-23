import React, { FC, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { changeStyleSelectorVisibility } from '../../actions';
import { SketchPicker } from 'react-color';
import taskTypes, { textColor } from '../task-types';
import styles from './style-selector.module.css';
import StyleSelectorItem from '../style-selector-item';

const StyleSelector: FC<any> = ({ visibility, changeStyleSelectorVisibility }) => {
    const [stateColor, setStateColor] = useState('#fff');
    const [stateElement, setStateElement] = useState(null);
    const taskTypesModified = taskTypes.map((item, id) => {
        // @ts-ignore
        return {...item, id}
    })
    taskTypesModified.push({ ...textColor, id: taskTypes.length });
    const [taskData, setTaskData] = useState(taskTypesModified);
    const handleOk = (): void => {
        taskTypes.forEach((e, idx) => {
            e.color = taskData[idx].color;
        })
        textColor.color = taskData[taskData.length - 1].color;
        changeStyleSelectorVisibility(false)
    }

    const handleCancel = (): void => {
        changeStyleSelectorVisibility(false);
    }

    const handleChangeComplete = ({hex}: any): void => {
        setStateColor(hex);
        if (stateElement !== null) {
            // @ts-ignore
            const color = stateElement.dataset.color
            const index = taskData.findIndex(item => item.color === color)
            if (index !== -1) {
                const task = taskData[index];
                task.color = hex;
                const newTaskData = [
                    ...taskData.slice(0, index),
                    task,
                    ...taskData.slice(index + 1)
                ]
                setTaskData(newTaskData);
            }
        }
    }

    const onColorPick = (e: any): void => {
        if (e) {
            const target = e.target;
            const color = target.dataset.color;
            setStateColor(color);
            setStateElement(target);
        }
    }
    return (
        <Modal
        title="Select Styles"
        visible={visibility}
        onOk={handleOk}
        onCancel={handleCancel}
      >
          <div className={styles['modal-container']}>
            <ul className={styles['style-selector__list']}>
                {taskData.map(({text, color, id}) => {
                    return (
                        <li key={id}><StyleSelectorItem text={text} color={color} onColorPick={onColorPick}/></li>
                    )
                })}
            </ul>
            <div className="color-selector">
                <SketchPicker
                    color={stateColor}
                    onChangeComplete={handleChangeComplete} 
                />
            </div>
          </div>
      </Modal>
    );
};

const mapDispatchToProps = { changeStyleSelectorVisibility };

export default connect(null, mapDispatchToProps)(StyleSelector);
