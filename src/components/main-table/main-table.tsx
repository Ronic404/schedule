/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import {
  Table, Layout, Button,
} from 'antd';
import { connect } from 'react-redux';

import moment from 'moment-timezone';
import ColsSelector from '../cols-selector';
import Spinner from '../spinner';
// import scheduleService from '../../services/schedule-service';
import withScheduleService from '../hoc';
import { eventsLoaded, changeTimezone } from '../../actions';
import {
  compose, createColsTitles,
} from '../../utils';
import getColumnDefs from '../columns';
import { IEvent } from '../../interfaces';
import styles from './main-table.module.css';

type PropType = {
  events: IEvent[],
  loading: boolean,
  timezone: any,
  scheduleService: any,
};

const MainTable: FC<PropType> = ({
  scheduleService,
  events, loading, timezone,
}: PropType): ReactElement => {
  const [colsTitles, setColsTitles] = useState<{ title: string, checked: boolean }[]>([]);
  const [checkedRows, setCheckedRows] = useState<IEvent[]>([]);
  const [hiddenRows, setHiddenRows] = useState<IEvent[]>([]);
  const [showHideBtn, setShowHideBtn] = useState<boolean>(false);
  const [showAllBtn, setShowAllBtn] = useState<boolean>(false);
  const [visibleData, setVisibleData] = useState<IEvent[]>(events);
  const [columns, setColumns] = useState(getColumnDefs(timezone));
  const startOfToday = moment().startOf('day');

  const changeColsHandler = (cols: { title: string, checked: boolean }[]) => {
    setColsTitles(cols);
  };

  const hideClickHandle = () => {
    const updatedData = visibleData.filter((row) => !hiddenRows.some((hiddenRow) => (
      row.key === hiddenRow.key
    )));
    hiddenRows.forEach((record: IEvent) => {
      record.hidden = true;
      scheduleService.updateEvent(record.id, record);
    });
    localStorage.setItem('hidden', JSON.stringify(hiddenRows));
    setShowHideBtn(false);
    setVisibleData(updatedData);
    setShowAllBtn(true);
  };

  const unhiddenClickHandle = () => {
    setShowAllBtn(false);
    setVisibleData(events);
    hiddenRows.forEach((record: IEvent) => {
      record.hidden = false;
      scheduleService.updateEvent(record.id, record);
    });
    setHiddenRows([]);
    localStorage.setItem('hidden', JSON.stringify([]));
  };

  const activeCols = () => {
    const temp: any = [];

    colsTitles.forEach((el: any) => {
      if (el.checked) {
        temp.push(columns.find((c: any) => c.title === el.title));
      }
    });

    localStorage.setItem('activeColumns', JSON.stringify(temp));
    return temp;
  };

  const selectRow = (record: IEvent, el: any) => {
    const selectedRows = [...checkedRows];
    let rowsToHide = [...hiddenRows];

    if (el.shiftKey && el.target.classList.contains('ant-table-cell')) {
      setShowHideBtn(true);
      el.target.parentNode.classList.toggle('ant-table-row-selected');
      if (rowsToHide.indexOf(record) !== -1) {
        rowsToHide.splice(rowsToHide.indexOf(record), 1);
      } else {
        rowsToHide.push(record);
      }
      setHiddenRows(rowsToHide);
    }

    if (!el.shiftKey && el.target.classList.contains('ant-table-cell')) {
      const removeStyles = document.querySelectorAll('.ant-table-row-selected');
      setShowHideBtn(true);
      removeStyles.forEach((e: any) => { e.classList.remove('ant-table-row-selected'); });

      if (rowsToHide.length) {
        rowsToHide = [];
      } else {
        el.target.parentNode.classList.add('ant-table-row-selected');
        rowsToHide.push(record);
      }

      setHiddenRows(rowsToHide);
    }

    if (el.target.classList.contains('ant-checkbox-input')) {
      const checkedRows = localStorage.getItem('checked');
      const checkedArr = checkedRows ? JSON.parse(checkedRows) : [];
      if (selectedRows.indexOf(record) !== -1) {
        checkedArr.splice(checkedArr.indexOf(record), 1);
        localStorage.setItem('checked', JSON.stringify(checkedArr));
        record.done = false;
        scheduleService.updateEvent(record.id, record);
        selectedRows.splice(selectedRows.indexOf(record), 1);
      } else {
        selectedRows.push(record);
        checkedArr.push(record);
        localStorage.setItem('checked', JSON.stringify(checkedArr));
        record.done = true;
        scheduleService.updateEvent(record.id, record);
      }

      setCheckedRows(selectedRows);
    }
  };

  useEffect(() => {
    scheduleService.getAllEvents()
      .then((res: any) => {
        eventsLoaded(res);

        // res.forEach((el: any) => {
        //   scheduleService.deleteEvent(el.id);
        // });
        setVisibleData(res.filter((el: IEvent) => !el.hidden));
        setHiddenRows(res.filter((el: IEvent) => el.hidden));
        localStorage.setItem('hidden', JSON.stringify(res.filter((el: IEvent) => el.hidden)));
        if (res.filter((el: IEvent) => el.hidden).length) setShowAllBtn(true);
      });
  }, [scheduleService]);

  useEffect(() => {
    if (!hiddenRows.length) setShowHideBtn(false);
  }, [hiddenRows]);

  useEffect(() => {
    const newColumns = getColumnDefs(timezone);
    setColumns(newColumns);
    setColsTitles(createColsTitles(newColumns));
  }, [timezone]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className={styles['btn-container']}>
        <ColsSelector
          onChangeCols={(cols: { title: string, checked: boolean }[]) => changeColsHandler(cols)}
          columns={colsTitles}
        />
        {showAllBtn && <Button onClick={unhiddenClickHandle}>Show Hidden</Button>}
        {showHideBtn && <Button onClick={hideClickHandle}>Hide</Button>}
      </div>
      <Table
        size="middle"
        rowClassName={(record) => (moment({ ...record.date, ...record.time }).isBefore(startOfToday) ? `${styles['rs-table-row-disabled']}` : '')}
        columns={activeCols()}
        dataSource={visibleData}
        onRow={(record) => ({ onClick: (el) => selectRow(record, el) })}
      />
    </Layout>
  );
};

const mapStateToProps = ({ events, loading, timezone }: any): any => ({
  events,
  loading,
  timezone,
});

const mapDispatchToProps = {

  eventsLoaded, changeTimezone,
};

export default compose(withScheduleService(),
  connect(mapStateToProps, mapDispatchToProps))(MainTable);
