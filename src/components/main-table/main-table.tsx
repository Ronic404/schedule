import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import {
  Table, Layout, Button,
} from 'antd';
import { connect } from 'react-redux';

import ColsSelector from '../cols-selector';

import compose from '../../utils';
import columns from '../columns';
import data from '../data';
import { IEvent } from '../../interfaces';
import withScheduleService from '../hoc';
import styles from './main-table.module.css';

const dateFormat = 'DD-MM-YYYY';

interface Item {
  key: string,
  date?: any,
  time: string,
  type: string,
  place: string,
  name: string,
  organizer: string,
  comment: string,
  done?: boolean,
  hided?: boolean,
}

const mapDatesToString = () => {
  const [...tempData] = data;
  return tempData.map((el) => {
    const { ...temp } = el;
    temp.date = temp.date?.format(dateFormat);
    return temp;
  });
};

const createColsTitles = () => {
  const temp: { title: string, checked: boolean }[] = [];
  const [...titles] = columns;
  titles.forEach((col) => {
    temp.push({ title: col.title, checked: true });
  });
  return temp;
};

type TypeProps = {
  scheduleService: any,
  events: IEvent[],
};

const MainTable: FC<TypeProps> = ({ scheduleService, events }: TypeProps): ReactElement => {
  const [colsTitles, setColsTitles] = useState<{ title: string, checked: boolean }[]>([]);
  const [checkedRows, setCheckedRows] = useState<Item[]>([]);
  const [hidedRows, setHidedRows] = useState<Item[]>([]);
  const [showHideBtn, setShowHideBtn] = useState<boolean>(false);
  const [showAllBtn, setShowAllBtn] = useState<boolean>(false);
  const [loadedData, setLoadedData] = useState<IEvent[]>(events);
  // eslint-disable-next-line
  const [visibleData, setVisibleData] = useState<Item[]>(mapDatesToString());

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

  const unhiddenClickHandle = () => {
    setVisibleData(data);
    setShowAllBtn(false);
  };

  const activeCols = () => {
    const temp: any = [];
    colsTitles.forEach((el) => {
      if (el.checked) {
        temp.push(columns.find((c) => c.title === el.title));
      }
    });
    return temp;
  };

  const selectRow = (record: Item, el: any) => {
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
      if (rowsToHide.length) {
        rowsToHide = [];
      } else {
        el.target.parentNode.classList.add('ant-table-row-selected');
        rowsToHide.push(record);
      }
      setHidedRows(rowsToHide);
    }

    if (el.target.classList.contains('ant-checkbox-input')) {
      if (selectedRows.indexOf(record) !== -1) {
        // eslint-disable-next-line no-param-reassign
        record.done = false;
        selectedRows.splice(selectedRows.indexOf(record), 1);
      } else {
        selectedRows.push(record);
        // eslint-disable-next-line no-param-reassign
        record.done = true;
      }
      setCheckedRows(selectedRows);
    }
  };

  useEffect(() => {
    scheduleService.getAllEvents()
      .then((res: any) => {
        setLoadedData(res.events);
      });
  }, []);

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
        {showAllBtn && <Button onClick={unhiddenClickHandle}>Show Hided</Button>}
        {showHideBtn && <Button onClick={hideClickHandle}>Hide</Button>}
      </div>
      <Table
        size="middle"
        columns={activeCols()}
        dataSource={visibleData}
        onRow={(record) => ({ onClick: (el) => selectRow(record, el) })}
      />
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  events: state.events,
});

export default compose(
  withScheduleService(),
  connect(mapStateToProps),
)(MainTable);
