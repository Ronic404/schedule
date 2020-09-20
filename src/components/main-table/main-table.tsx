import React, {
  FC, useEffect, useState,
} from 'react';
import {
  Table, Layout, Button,
} from 'antd';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import styles from './main-table.module.css';
import ColsSelector from '../cols-selector';
import getColumnDefs from '../columns';
import data from '../data';

const createColsTitles = (columns: any) => {
  const temp: { title: string, checked: boolean }[] = [];
  const [...titles] = columns;
  titles.forEach((col: any) => {
    temp.push({ title: col.title, checked: true });
  });
  return temp;
};

const MainTable: FC<{ timezone: string }> = ({ timezone }) => {
  const [colsTitles, setColsTitles] = useState<{ title: string, checked: boolean }[]>([]);
  const [checkedRows, setCheckedRows] = useState<{ key: string, done: boolean }[]>([]);
  const [hidedRows, setHidedRows] = useState<{ key: string, hided: boolean }[]>([]);
  const [showHideBtn, setShowHideBtn] = useState<boolean>(false);
  const [showAllBtn, setShowAllBtn] = useState<boolean>(false);
  const [columns, setColumns] = useState(getColumnDefs(timezone));
  const startOfToday = moment().startOf('day');
  // eslint-disable-next-line
  const [visibleData, setVisibleData] = useState<{ key: string, hided: boolean, done: boolean, dateTime: moment.Moment }[]>(data);

  const changeColsHandler = (cols: { title: string, checked: boolean }[]) => {
    setColsTitles(cols);
  };

  const hideClickHandle = () => {
    // eslint-disable-next-line
    const updatedData = visibleData.filter((row) => !hidedRows.some((hiddenRow) => row.key === hiddenRow.key));
    setShowHideBtn(false);
    setVisibleData(updatedData);
    setShowAllBtn(true);
  };

  const unhideClickHandle = () => {
    setVisibleData(data);
    setShowAllBtn(false);
  };

  const activeCols = () => {
    const temp: any = [];
    colsTitles.forEach((el) => {
      if (el.checked) temp.push(columns.find((c) => c.title === el.title));
    });
    return temp;
  };

  const selectRow = (record: { key: string, done: boolean, hided: boolean }, el: any) => {
    const selectedRows = [...checkedRows];
    let rowsToHide = [...hidedRows];

    if (el.shiftKey && el.target.classList.contains('ant-table-cell')) {
      el.target.parentNode.classList.toggle('ant-table-row-selected');
      if (rowsToHide.indexOf(record) !== -1) {
        rowsToHide.splice(rowsToHide.indexOf(record), 1);
      } else {
        rowsToHide.push(record);
      }
      setHidedRows(rowsToHide);
    }

    if (!el.shiftKey && el.target.classList.contains('ant-table-cell')) {
      const removeStyles = document.querySelectorAll('.ant-table-row-selected');
      removeStyles.forEach((e: any) => { e.classList.remove('ant-table-row-selected'); });
      if (rowsToHide.length) { rowsToHide = []; } else {
        el.target.parentNode.classList.add('ant-table-row-selected');
        rowsToHide.push(record);
      }
      setHidedRows(rowsToHide);
    }

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
  };

  useEffect(() => {
    const newColumns = getColumnDefs(timezone);
    setColumns(newColumns);
    setColsTitles(createColsTitles(newColumns));
  }, [timezone]);

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
        {showAllBtn && <Button onClick={unhideClickHandle}>Show Hided</Button>}
        {showHideBtn && <Button onClick={hideClickHandle}>Hide</Button>}
      </div>
      <Table
        rowClassName={(record) => (moment(record.dateTime).isBefore(startOfToday) ? `${styles['rs-table-row-disabled']}` : '')}
        size="middle"
        columns={activeCols()}
        dataSource={visibleData}
        onRow={(record) => ({ onClick: (el) => selectRow(record, el) })}
      />
    </Layout>
  );
};
const mapStateToProps = (state: any) => (({
  timezone: state.timezone.type,
}));

export default connect(mapStateToProps)(MainTable);
