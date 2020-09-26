/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import {
  Table, Layout, Button,
} from 'antd';
import { connect } from 'react-redux';

import ColsSelector from '../cols-selector';
import Spinner from '../spinner';

import { eventsLoaded } from '../../actions';
import {
  compose, mapDatesToString, createColsTitles,
} from '../../utils';
import columns from '../columns';
import { IEvent } from '../../interfaces';
import withScheduleService from '../hoc';
import styles from './main-table.module.css';

type PropType = {
  scheduleService: any,
  events: IEvent[],
  eventsLoaded: any,
  loading: boolean,
};

const MainTable: FC<PropType> = ({
  scheduleService, events, eventsLoaded, loading,
}: PropType): ReactElement => {
  const [colsTitles, setColsTitles] = useState<{ title: string, checked: boolean }[]>([]);
  const [checkedRows, setCheckedRows] = useState<IEvent[]>([]);
  const [hiddenRows, setHiddenRows] = useState<IEvent[]>([]);
  const [showHideBtn, setShowHideBtn] = useState<boolean>(false);
  const [showAllBtn, setShowAllBtn] = useState<boolean>(false);
  const [visibleData, setVisibleData] = useState<IEvent[]>(events);

  const changeColsHandler = (cols: { title: string, checked: boolean }[]) => {
    setColsTitles(cols);
  };

  const hideClickHandle = () => {
    const updatedData = visibleData.filter((row) => !hiddenRows.some((hiddenRow) => (
      row.key === hiddenRow.key
    )));

    setShowHideBtn(false);
    setVisibleData(updatedData);
    setShowAllBtn(true);
  };

  const unhiddenClickHandle = () => {
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

  const selectRow = (record: IEvent, el: any) => {
    const selectedRows = [...checkedRows];
    let rowsToHide = [...hiddenRows];

    if (el.ctrlKey && el.target.classList.contains('ant-table-cell')) {
      el.target.parentNode.classList.toggle('ant-table-row-selected');

      if (rowsToHide.indexOf(record) !== -1) {
        rowsToHide.splice(rowsToHide.indexOf(record), 1);
      } else {
        rowsToHide.push(record);
      }

      setHiddenRows(rowsToHide);
    }

    if (!el.ctrlKey && el.target.classList.contains('ant-table-cell')) {
      const removeStyles = document.querySelectorAll('.ant-table-row-selected');

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
    scheduleService.getAllEvents()
      .then((res: any) => {
        eventsLoaded(res);
        setVisibleData(mapDatesToString(res));
      });
  }, []);

  useEffect(() => {
    setColsTitles(createColsTitles(columns));
  }, []);

  useEffect(() => {
    setShowHideBtn(Boolean(hiddenRows.length));
  }, [hiddenRows]);

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
        columns={activeCols()}
        dataSource={visibleData}
        onRow={(record) => ({ onClick: (el) => selectRow(record, el) })}
      />
    </Layout>
  );
};

const mapStateToProps = ({ events, loading }: any): any => ({
  events,
  loading,
});

const mapDispatchToProps = {
  eventsLoaded,
};

export default compose(
  withScheduleService(),
  connect(mapStateToProps, mapDispatchToProps),
)(MainTable);
