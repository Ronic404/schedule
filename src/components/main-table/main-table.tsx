import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import {
  Table, Layout, Button
} from 'antd';

import styles from './main-table.module.css';
import ColsSelector from '../cols-selector';
import columns from '../columns';
import data from '../data';

const createColsTitles = () => {
  const temp: { title: string, checked: boolean }[] = [];
  const [...titles] = columns;
  titles.forEach((col) => {
    temp.push({ title: col.title, checked: true });
  });
  return temp;
};

const MainTable: FC = (): ReactElement => {
  const [colsTitles, setColsTitles] = useState<{ title: string, checked: boolean }[]>([]);
  const [checkedRows, setCheckedRows] = useState<{ key: string, done: boolean }[]>([]);
  const [hidedRows, setHidedRows] = useState<{ key: string, hided: boolean }[]>([]);
  const [showHideBtn, setShowHideBtn] = useState<boolean>(false);

  const changeColsHandler = (cols: { title: string, checked: boolean }[]) => {
    setColsTitles(cols);
  };

const hideClickHandle= () =>{
  
};
  const activeCols = () => {
     const temp: any = [];
     colsTitles.forEach((el) => {
      if (el.checked) temp.push(columns.find((c) => c.title === el.title));
    })
    return temp;
  };

  const selectRow = (record: { key: string, done: boolean, hided: boolean }, el: any) => {
    const selectedRows = [...checkedRows];
    let rowsToHide = [...hidedRows];

    if (el.shiftKey && el.target.classList.contains('ant-table-cell')) {
      el.target.parentNode.classList.toggle('ant-table-row-selected')
      if (rowsToHide.indexOf(record) !== -1) {
        //record.hided = false;
        rowsToHide.splice(rowsToHide.indexOf(record), 1);
      } else {
        rowsToHide.push(record);
        // record.hided = true;
      }
      setHidedRows(rowsToHide);

    }
   

    if (!el.shiftKey && el.target.classList.contains('ant-table-cell')) {
      const removeStyles=document.querySelectorAll('.ant-table-row-selected');
      removeStyles.forEach((el: any) => { el.classList.remove('ant-table-row-selected')});
      if (rowsToHide[0]) { rowsToHide = [] } else {
        el.target.parentNode.classList.add('ant-table-row-selected');
        rowsToHide.push(record);
        //  record.hided = true;
      }
      setHidedRows(rowsToHide);
    }
    console.log(rowsToHide);
    if (el.target.classList.contains('ant-checkbox-input')) {
      if (selectedRows.indexOf(record) !== -1) {
        record.done = false;
        selectedRows.splice(selectedRows.indexOf(record), 1);
      } else {
        selectedRows.push(record);
        record.done = true;
      }
      setCheckedRows(selectedRows);
    }
  }

  useEffect(() => {
    setColsTitles(createColsTitles());
  }, []);

  useEffect(() => {
    setShowHideBtn(Boolean(hidedRows.length));
  }, [hidedRows]);


  return (
    <Layout>
      <div className={styles['btn-container']}>
        <ColsSelector
          onChangeCols={(cols: { title: string, checked: boolean }[]) => changeColsHandler(cols)}
          columns={colsTitles}
        />
        {showHideBtn ?
          <Button type="primary" size="small" onClick={hideClickHandle} >HIDE</Button>
          : null}
      </div>
      <Table size="middle" columns={activeCols()} dataSource={data}
        onRow={(record) => ({ onClick: el => selectRow(record, el) })}
      />
    </Layout>
  );
};

export default MainTable;
