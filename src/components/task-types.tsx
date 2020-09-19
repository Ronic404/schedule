interface taskTypesArray {
    text: string,
    value: string,
    color?: string,
  }

const taskTypes: taskTypesArray[] = [
  {
    text: 'Stream',
    value: 'stream',
    color: "magenta",
  },
  {
    text: 'Faculty',
    value: 'faculty',
    color: "purple",
  },
  {
    text: 'Self-education',
    value: 'self-education',
    color: "gold",
  },
  {
    text: 'Test',
    value: 'test',
    color: "blue",
  },
  {
    text: 'Deadline',
    value: 'deadline',
    color: "red",
  },
  {
    text: 'Start',
    value: 'start',
    color: "green",
  },
];

export default taskTypes;
