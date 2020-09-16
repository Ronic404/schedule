import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import {
  Table, Layout,
} from 'antd';

// import styles from './main-table.module.css';
import ColsSelector from '../cols-selector';
import columns from '../columns';
import data from '../data';

const createColsTitles = () => {
  const temp: {title: string, checked: boolean}[] = [];
  const [...titles] = columns;
  titles.forEach((col) => {
    temp.push({ title: col.title, checked: true });
  });
  return temp;
};

const MainTable: FC = (): ReactElement => {
  const [colsTitles, setColsTitles] = useState<{title: string, checked: boolean}[]>([]);

  const changeColsHandler = (cols: {title: string, checked: boolean}[]) => {
    setColsTitles(cols);
  };

  const activeCols = () => {
    const temp: any = [];
    colsTitles.forEach((el) => {
      if (el.checked) temp.push(columns.find((c) => c.title === el.title));
    });
    return temp;
  };

  useEffect(() => {
    setColsTitles(createColsTitles());
  }, []);

  return (
    <Layout>
      <ColsSelector
        onChangeCols={(cols: {title: string, checked: boolean}[]) => changeColsHandler(cols)}
        columns={colsTitles}
      />
      <Table size="middle" columns={activeCols()} dataSource={data} />
    </Layout>
  );
};

export default MainTable;
