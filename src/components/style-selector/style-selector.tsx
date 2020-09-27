import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Alert } from 'antd';
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
  const [newTypeModalVisibility, setNewTypeModalVisibility] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeColor, setNewTypeColor] = useState('#123321');
  const [newTypeError, setNewTypeError] = useState('');
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

  const newTypeModalHandleOk = () => {
    if (!newTypeName.trim().length) {
      setNewTypeError('enter name');
    } else if (taskTypes.find(item => item.value.toLowerCase() === newTypeName.trim().toLowerCase())) {
      setNewTypeError('name already exists');
    } else {
      setNewTypeError('');
        const newType = {
          text: newTypeName,
          value: newTypeName.toLowerCase(),
          color: newTypeColor,
          id: taskData.length,
        };
        const draftState = [...taskData];
        draftState.push(newType);
        setTaskData(draftState);
        setNewTypeColor('#123321');
        setNewTypeName('');
        setNewTypeModalVisibility(false);
    }
  }

  const newTypeModalHandleCancel = () => {
    setNewTypeError('');
    setNewTypeColor('#123321');
    setNewTypeName('');
    setNewTypeModalVisibility(false);
  }

  const newTypeChangeComplete = ({ hex }: handleChangeCompleteTypes): void => {
    setNewTypeColor(hex);
  }

  const newTypeChangeName = (e: any) => {
    const name = e.target.value;
    setNewTypeName(name);
  }

  return (
    <>
      <Modal 
        className={styles['new-type__modal']}
        title="Add new type"
        visible={newTypeModalVisibility}
        onOk={newTypeModalHandleOk}
        onCancel={newTypeModalHandleCancel}
      >
        <Input placeholder="Type name" value={newTypeName} onChange={newTypeChangeName}/>
        {newTypeError ? (
          <Alert message={newTypeError} type="error" />
        ) : null}
        <SketchPicker
              color={newTypeColor}
              onChangeComplete={newTypeChangeComplete}
        />
      </Modal>
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
            <HeaderButton buttonImage={<PlusCircleOutlined />} handler={setNewTypeModalVisibility} />
          </ul>
          <div className="color-selector">
            <SketchPicker
              color={stateColor}
              onChangeComplete={handleChangeComplete}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

const mapDispatchToProps = { changeStyleSelectorVisibility };

export default connect(null, mapDispatchToProps)(StyleSelector);
