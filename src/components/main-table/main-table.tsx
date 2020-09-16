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
  const [checkedRows,setCheckedRows] = useState<{key: string, done: boolean}[]>([]);

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

  const selectRow = (record:{key: string,done:boolean},el:any) => {
    const selectedRows = [...checkedRows];
    console.log(el.target)
     if(el.target.classList.contains('ant-checkbox-input')){
    if (selectedRows.indexOf(record) >= 0) {
      record.done=false;
      selectedRows.splice(selectedRows.indexOf(record), 1);
    } else {
      selectedRows.push(record);
      record.done=true;
    }
    setCheckedRows( selectedRows );}
    console.log(selectedRows)
  }

  useEffect(() => {
    setColsTitles(createColsTitles());
  }, []);

  // const onSelectChange = (checkedRows:any) => {
  //   console.log('selectedRowKeys changed: ', checkedRows);
  //   setCheckedRows(checkedRows );
  // };

  // const rowSelection = {
  //   checkedRows,
  //   onChange: onSelectChange,
  // };

  return (
    <Layout>
      <ColsSelector
        onChangeCols={(cols: {title: string, checked: boolean}[]) => changeColsHandler(cols)}
        columns={colsTitles}
      />
      <Table size="middle" columns={activeCols()} dataSource={data}
      // rowSelection={rowSelection}
      onRow={(record) => ({onClick: (el) => {selectRow(record,el);},})}
       />
    </Layout>
  );
};

export default MainTable;
