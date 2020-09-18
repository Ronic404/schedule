import moment, { Moment } from 'moment';

interface Item {
  key: string,
  date?: string | Moment,
  time: string,
  type: string,
  place: string,
  name: string,
  organizer: string,
  comment: string,
  done?: boolean,
}

const dateFormat = 'YYYY/MM/DD';

const data: Item[] = [
  {
    key: '1',
    date: moment('2015/01/01', dateFormat),
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
    date: moment('2015/01/01', dateFormat),
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
    date: moment('2015/01/01', dateFormat),
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
