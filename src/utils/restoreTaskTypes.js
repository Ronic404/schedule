import taskTypes, { textColor } from '../components/task-types';

const restoreTaskTypes = () => {
  const textColorStorage = JSON.parse(localStorage.getItem('textColor'));
  const taskTypesStorage = JSON.parse(localStorage.getItem('taskTypes'));

  textColor.color = textColorStorage.color;

  taskTypes.splice(0);
  taskTypes.push(...taskTypesStorage);
};

export default restoreTaskTypes;
