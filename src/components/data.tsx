import moment from 'moment';

const data = [
  {
    key: '1',
    date: moment([2020,8, 19]).format('ll'),
    time: moment({hour: 18, minute: 0 },).format('HH:mm'),
    type: 'test',
    place: '',
    name: 'Тест как учиться в RSSchool',
    organizer: 'dzmitry-varabei',
    comment: '4 часа на прохождение',
    done: true,
  },
  {
    key: '2',
    date: moment([2020,8, 19]).format('ll'),
    time: moment({hour: 19, minute: 0 },).format('HH:mm'),
    type: 'stream',
    place: '',
    name: 'Git Basics. Live coding',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '3',
    date: moment([2020,8, 21]).format('ll'),
    time: moment({hour: 12, minute: 0 },).format('HH:mm'),
    type: 'start',
    place: '',
    name: 'Task 1. Calculator',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '4',
    date: moment([2020,8, 22]).format('ll'),
    time: moment({hour: 12, minute: 0 },).format('HH:mm'),
    type: 'start',
    place: '',
    name: 'Алгоритмические задания Stage#1. Part #1',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '5',
    date: moment([2020,8, 22]).format('ll'),
    time: '',
    type: 'self-education',
    place: '',
    name: 'JavaScript Intro',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '6',
    date: moment([2020,8, 22]).format('ll'),
    time: moment({hour: 20, minute: 0 },).format('HH:mm'),
    type: 'stream',
    place: '',
    name: 'FAQ: Photoshop and Figma',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '7',
    date: moment([2020,8, 22]).format('ll'),
    time: '',
    type: 'self-education',
    place: '',
    name: 'Flexbox and Grid',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '8',
    date: moment([2020,8, 24]).format('ll'),
    time: '',
    type: 'self-education',
    place: '',
    name: 'Ответы на вопросы по алгоритмическим заданиям Stage#1. Part #1',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '9',
    date: moment([2020,8, 25]).format('ll'),
    time: moment({hour: 19, minute: 0 },).format('HH:mm'),
    type: 'faculty',
    place: '',
    name: 'Live coding макета',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '10',
    date: moment([2020,8, 26]).format('ll'),
    time: moment({hour: 18, minute: 0 },).format('HH:mm'),
    type: 'test',
    place: '',
    name: 'Тест по основам Git.',
    organizer: 'dzmitry-varabei',
    comment: 'Ссылка будет в Discord. Его необходимо пройти за 24 часа',
    done: false,
  },
  {
    key: '11',
    date: moment([2020,8, 28]).format('ll'),
    time: '',
    type: 'self-education',
    place: '',
    name: 'Evening Talk: Algorithms bootstrap',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '12',
    date: moment([2020,8, 28]).format('ll'),
    time: moment({hour: 12, minute: 0 },).format('HH:mm'),
    type: 'start',
    place: '',
    name: 'Task 2. Dynamic Landing Page',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '13',
    date: moment([2020,8, 29]).format('ll'),
    time: moment({hour: 12, minute: 0 },).format('HH:mm'),
    type: 'start',
    place: '',
    name: 'Singolo. Part 2 (tags, 4 and 3 columns layout)',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
  {
    key: '14',
    date: moment([2020,8, 26]).format('ll'),
    time: moment({hour: 18, minute: 0 },).format('HH:mm'),
    type: 'self-education',
    place: '',
    name: 'JS Data Types',
    organizer: 'dzmitry-varabei',
    comment: '',
    done: false,
  },
];

export default data;
