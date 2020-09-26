import React, { FC, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { SketchPicker } from 'react-color';
import { changeStyleSelectorVisibility } from '../../actions';
import taskTypes, { textColor } from '../task-types';
import styles from './style-selector.module.css';
import StyleSelectorItem from '../style-selector-item';
import HeaderButton from '../header-button';
import { PlusCircleOutlined } from '@ant-design/icons';

const StyleSelector: FC<any> = ({ visibility, changeStyleSelectorVisibility }) => {
  const [stateColor, setStateColor] = useState('#fff');
  const [stateElement, setStateElement] = useState(null);
  const taskTypesModified = taskTypes.map((item, id) =>
  // @ts-ignore
    ({ ...item, id }));
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
        const { text, value, color} = taskData[i];
        const obj = {
          text,
          value,
          color
        };
        taskTypes.push(obj);
      }
    }

    changeStyleSelectorVisibility(false);
  };

  const handleCancel = (): void => {
    const taskTypesModified = taskTypes.map((item, id) =>
    // @ts-ignore
      ({ ...item, id }));
    taskTypesModified.push({ ...textColor, id: taskTypes.length });
    setTaskData(taskTypesModified);
    setStateColor('#fff');
    setStateElement(null);
    changeStyleSelectorVisibility(false);
  };

  const handleChangeComplete = ({ hex }: any): void => {
    setStateColor(hex);
    if (stateElement !== null) {
      // @ts-ignore
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
      color: '#000',
      id: taskData.length
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
            <li key={id}><StyleSelectorItem text={text} color={color} onColorPick={onColorPick} /></li>
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
