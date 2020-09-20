interface taskTypesArray {
    text: string,
    value: string,
    color?: string,
  }

const taskTypes: taskTypesArray[] = [
  {
    text: 'Stream',
    value: 'stream',
    color: '#FF9A6F',
  },
  {
    text: 'Faculty',
    value: 'faculty',
    color: '#BE6AFF',
  },
  {
    text: 'Self-education',
    value: 'self-education',
    color: '#f9d800',
  },
  {
    text: 'Test',
    value: 'test',
    color: '#6ADBFF',
  },
  {
    text: 'Deadline',
    value: 'deadline',
    color: '#FF6A6A',
  },
  {
    text: 'Start',
    value: 'start',
    color: '#A3FF6A',
  },
];

export default taskTypes;
