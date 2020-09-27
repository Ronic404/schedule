const createColsTitles = (columns: any): any => {
  const temp: { title: string, checked: boolean }[] = [];
  const [...titles] = columns;

  titles.forEach((col: any) => {
    temp.push({ title: col.title, checked: true });
  });

  return temp;
};

export default createColsTitles;
