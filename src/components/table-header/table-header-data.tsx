import { IOptionItem } from '../../interfaces';

const locations: Array<IOptionItem> = [
  {
    name: 'Europe/London',
    id: 1,
  },
  {
    name: 'Europe/Warsaw',
    id: 2,
  },
  {
    name: 'Europe/Kiev',
    id: 3,
  },
  {
    name: 'Europe/Minsk',
    id: 4,
  },
  {
    name: 'Europe/Moscow',
    id: 5,
  },
  {
    name: 'Europe/Volgograd',
    id: 6,
  },
  {
    name: 'Europe/Yekaterinburg',
    id: 7,
  },
  {
    name: 'Europe/Tashkent',
    id: 8,
  },
  {
    name: 'Europe/Tbilisi',
    id: 9,
  },
];
const defaultLocationIndex = 3;

const displays: Array<IOptionItem> = [
  {
    name: 'Table',
    id: 1,
  },
  {
    name: 'List',
    id: 2,
  },
  {
    name: 'Calendar',
    id: 3,
  },
  {
    name: 'Create task',
    id: 4,
  },
];
const defaultDisplayIndex = 0;

const courses: Array<IOptionItem> = [
  {
    name: 'RSS react 2020 Q3',
    id: 1,
  },
  {
    name: 'RSS 2020 Q1',
    id: 2,
  },
  {
    name: 'RSS angular 2020 Q3',
    id: 3,
  },
  {
    name: 'RSS node js 2020 Q3',
    id: 4,
  },
];
const defaultCourseIndex = 0;

export {
  locations,
  defaultLocationIndex,
  displays,
  defaultDisplayIndex,
  courses,
  defaultCourseIndex,
};
