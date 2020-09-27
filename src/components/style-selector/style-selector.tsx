import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { SketchPicker } from 'react-color';
import { PlusCircleOutlined } from '@ant-design/icons';
import { changeStyleSelectorVisibility } from '../../actions';
import taskTypes, { textColor } from '../task-types';
import styles from './style-selector.module.css';
import StyleSelectorItem from '../style-selector-item';
import HeaderButton from '../header-button';

type StyleSelectorTypes = {
  visibility: boolean,
  changeStyleSelectorVisibility: any
}
// eslint-disable-next-line
const StyleSelector = ({ visibility, changeStyleSelectorVisibility } : StyleSelectorTypes) => {
  const [stateColor, setStateColor] = useState('#fff');
  const [stateElement, setStateElement] = useState(null);
  const taskTypesModified = taskTypes.map((item, id) => ({ ...item, id }));
  taskTypesModified.push({ ...textColor, id: taskTypes.length });
  const [taskData, setTaskData] = useState(taskTypesModified);
  const handleOk = (): void => {
    taskTypes.forEach((e, idx) => {
      e.color = taskData[idx].color;
      e.text = taskData[idx].text;
      e.value = taskData[idx].value;
    });
    textColor.color = taskData[taskData.length - 1].color;

    if (taskTypes.length < taskData.length) {
      for (let i = taskTypes.length; i < taskData.length; i += 1) {
        const { text, value, color } = taskData[i];
        const obj = {
          text,
          value,
          color,
        };
        taskTypes.push(obj);
      }
    }

    const textColorIndex = taskTypes.findIndex((item) => item.value === 'text color');
    taskTypes.splice(textColorIndex, 1);

    changeStyleSelectorVisibility(false);
    localStorage.setItem('taskTypes', JSON.stringify(taskTypes));
    localStorage.setItem('textColor', JSON.stringify(textColor));
  };

  const handleCancel = (): void => {
    const taskTypesBeforeChange = taskTypes.map((item, id) => ({ ...item, id }));
    taskTypesBeforeChange.push({ ...textColor, id: taskTypes.length });
    setTaskData(taskTypesBeforeChange);
    setStateColor('#fff');
    setStateElement(null);
    changeStyleSelectorVisibility(false);
  };

  type handleChangeCompleteTypes = {
    hex: string
  }

  const handleChangeComplete = ({ hex }: handleChangeCompleteTypes): void => {
    setStateColor(hex);
    if (stateElement !== null) {
      // @ts-expect-error: object cant be null here
      const { color } = stateElement.dataset;
      const index = taskData.findIndex((item) => item.color === color);
      if (index !== -1) {
        const task = taskData[index];
        task.color = hex;
        const newTaskData = [
          ...taskData.slice(0, index),
          task,
          ...taskData.slice(index + 1),
        ];
        setTaskData(newTaskData);
      }
    }
  };

  const onColorPick = (e: any): void => {
    if (e) {
      const { target } = e;
      const { color } = target.dataset;
      setStateColor(color);
      setStateElement(target);
    }
  };

  const handleTypeAdd = ():void => {
    let name = 'new type';
    name = name.charAt(0).toUpperCase() + name.slice(1);
    const color = '#123456';
    const newType = {
      text: name,
      value: name.toLowerCase(),
      color,
      id: taskData.length,
    };
    const draftState = [...taskData];
    draftState.push(newType);
    setTaskData(draftState);
  };

  return (
    <Modal
      title="Select Styles"
      visible={visibility}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div className={styles['modal-container']}>
        <ul className={styles['style-selector__list']}>
          {taskData.map(({ text, color, id }) => (
            <li key={id}>
              <StyleSelectorItem
                text={text}
                color={color}
                onColorPick={onColorPick}
              />
            </li>
          ))}
          <HeaderButton buttonImage={<PlusCircleOutlined />} handler={handleTypeAdd} />
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
