import moment from 'moment';

const data = [
  {
    key: '1',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: 'test',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: false,
  },
  {
    key: '2',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: 'start',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: true,
  },
  {
    key: '3',
    date: moment().format('ll'),
    time: moment().format('LT'),
    type: 'stream',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: false,
  },
];

export default data;
