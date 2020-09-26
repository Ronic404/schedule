import moment from 'moment';

import { IEvent } from '../interfaces';

const dateFormat = 'DD-MM-YYYY';
const timeFormat = 'HH:mm';

const mapDatesToString = (arr: IEvent[]): any => {
  const [...tempData] = arr;

  return tempData.map((el) => {
    const { ...temp } = el;

    temp.time = moment(temp.time)?.format(timeFormat);
    temp.date = moment(temp.date)?.format(dateFormat);

    return temp;
  });
};

export default mapDatesToString;
