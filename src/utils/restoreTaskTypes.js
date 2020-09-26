import taskTypes, { textColor } from '../components/task-types';

const restoreTaskTypes = () => {
    console.log('before', textColor, taskTypes);
    const textColorStorage = JSON.parse(localStorage.getItem('textColor'));
    const taskTypesStorage = JSON.parse(localStorage.getItem('taskTypes'));

    textColor.color = textColorStorage.color;

    taskTypes.splice(0);
    taskTypes.push(...taskTypesStorage);

    console.log('after', textColor, taskTypes);
}

export default restoreTaskTypes;
