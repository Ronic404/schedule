type PropsFunc = {
  year: string,
  month: string,
  day: string,
  hour: string,
  minute: string,
};

function mapDateToObject(date: string, time: string): PropsFunc {
  const dateArr: string[] = date.split('-');
  const timeArr: string[] = time.split(':');

  return {
    year: dateArr[2],
    month: dateArr[1],
    day: dateArr[0],
    hour: timeArr[0],
    minute: timeArr[1],
  };
}

export default mapDateToObject;
