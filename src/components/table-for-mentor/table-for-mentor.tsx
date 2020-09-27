import React, {
  FC, ReactElement, useEffect, useRef, useState,
} from 'react';
import {
  Table, Input, Popconfirm, Form, DatePicker, Select, Tag, Button,
} from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';

import styles from './table-for-mentor.module.css';
import allCols from '../columns';
import allTypes from '../task-types';
import OrganizerCell from '../organizer-cell';
import { IEvent } from '../../interfaces';
import withScheduleService from '../hoc';
import {
  compose, mapDatesToString, mapDateToObject,
} from '../../utils';
import Spinner from '../spinner';

const { Option } = Select;

const dateFormat = 'DD-MM-YYYY';

interface Column {
  key?: string,
  title: string,
  dataIndex: string,
  editable?: boolean,
  render?: any
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  record: IEvent;
  index: number;
  children: React.ReactNode;
}

const createOriginData = (data: IEvent[]) => {
  const [...originData] = data;
  const temp = originData.map((d) => {
    const { ...newTemp } = d;
    newTemp.date = moment(newTemp?.date);
    newTemp.time = moment(newTemp.time)?.format('HH:mm');
    delete newTemp.done;
    delete newTemp.hidden;
    return newTemp;
  });
  return temp;
};

let originData: IEvent[] = [];
let dataFromBack: IEvent[] = [];

const createCols = (): Column[] => {
  const tempCols = [...allCols];
  const temp = tempCols.map((data) => {
    const { ...newTemp } = data;
    delete newTemp.render;
    delete newTemp.filters;
    delete newTemp.onFilter;
    return newTemp;
  });
  temp.pop();
  return temp;
};

const mapDateToString = (data: IEvent[]) => {
  try {
    const [...tempData] = data;
    return tempData.map((el) => {
      const { ...temp } = el;
      temp.date = temp.date?.format(dateFormat);
      return temp;
    });
  } catch {
    const [...tempData] = data;
    return tempData.map((el) => {
      const { ...temp } = el;
      temp.date = temp.date?.toString();
      return temp;
    });
  }
};

type PropType = {
  scheduleService: any,
  events: IEvent[],
  loading: boolean,
};

const TableForMentor: FC<PropType> = ({
  // eslint-disable-next-line no-shadow
  scheduleService, events, loading,
}: PropType): ReactElement => {
  const [form] = Form.useForm();
  const [data, setData] = useState(events);
  const [editingKey, setEditingKey] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [dateMoment, setDateMoment] = useState(moment());
  const rowRef = useRef({ type: '', organizer: '' });
  const timeInput = useRef<any>();

  useEffect(() => {
    dataFromBack = events;
    originData = createOriginData(dataFromBack);
    setData(mapDatesToString(dataFromBack));
  }, [events]);

  function onDateChange(date: any, dateString: string) {
    setDateStr(dateString);
    setDateMoment(date);
  }

  function onTypeChange(type: string) {
    rowRef.current.type = type;
  }

  // function onTimeChange(event: ChangeEvent<HTMLInputElement>) {
  //   setTimeStr(event.target.value);
  // }

  function checkTime(dataInput: string) {
    const reg = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/gm;

    if (reg.test(dataInput)) {
      return 'success';
    }

    return 'error';
  }

  const chooseInputNode = (title: string) => {
    if (title === 'Date') return <DatePicker onChange={onDateChange} format="DD-MM-YYYY" />;
    if (title === 'Type') {
      return (
        <Input.Group compact>
          <Select onChange={onTypeChange} defaultValue={rowRef.current.type}>
            {allTypes.map((type) => (
              <Option
                key={type.value}
                value={type.value}
              >
                <Tag color={type.color} key={type.value}>{type.value.toUpperCase()}</Tag>
              </Option>
            ))}
          </Select>
        </Input.Group>
      );
    }
    if (title === 'Time') {
      return (
        <Input ref={timeInput} />
      );
    }

    return <Input />;
  };

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }: EditableCellProps) => {
    const inputNode = chooseInputNode(title);
    const chooseRequire = () => {
      if (title === 'Place' || title === 'Comment') {
        return false;
      }
      return true;
    };

    return (
      // eslint-disable-next-line
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: chooseRequire(),
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing = (record: IEvent) => record.id === editingKey;

  const edit = (record: IEvent) => {
    form.setFieldsValue({
      ...record,
    });
  };
  /* eslint-disable */
  useEffect(() => {
    const record = data.find((el) => typeof el.date === 'object');
    if (record) {
      edit(record);
    }
  }, [data]);
  /* eslint-enable */
  const editHandler = (record: IEvent) => {
    const temp = originData.map((el) => {
      if (el.id !== record.id) {
        const { ...tempEl } = el;
        const t: IEvent[] = [];
        t.push(tempEl);
        return mapDateToString(t)[0];
      }
      return el;
    });
    console.log(temp);
    setData(temp);
    setEditingKey(record.id);
    setDateStr(record.date);
    setDateMoment((originData.find((el) => el.id === record.id))?.date);
    rowRef.current.type = record.type;
  };

  const cancel = () => {
    setEditingKey('');
    let dataToMap = data.filter((el) => typeof el.date === 'object');
    if (!dataToMap.length) return;
    dataToMap = mapDateToString(dataToMap);
    const newData = data.map((el) => {
      if (el.id === dataToMap[0].id) return dataToMap[0];
      return el;
    });
    setData(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: (data.length + 1).toString(),
      date: {
        day: 19,
        hour: 19,
        minute: 0,
        month: 8,
        year: 2020,
      },
      time: {
        day: 19,
        hour: 19,
        minute: 0,
        month: 8,
        year: 2020,
      },
      type: 'test',
      place: ' ',
      name: ' ',
      organizer: 'dzmitry-varabei',
      comment: ' ',
      done: false,
      hidden: false,
      task: '',
    };
    scheduleService.postEvent(newData);
    dataFromBack = [...dataFromBack, newData];
    originData = createOriginData(dataFromBack);
    setData(mapDatesToString(dataFromBack));
  };

  const save = async (id: string) => {
    try {
      const curData: string = timeInput.current.state.value;

      if (checkTime(curData) !== 'success') {
        alert('Please, enter time in HH:mm format');
        return;
      }

      const row = (await form.validateFields()) as IEvent;
      const originRow = (await form.validateFields()) as IEvent;
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const item: IEvent = newData[index];
        const originItem: IEvent = originData[index];

        item.date = dateStr;
        row.date = dateStr;
        originItem.date = dateMoment;
        originRow.date = dateMoment;
        item.type = rowRef.current.type;
        row.type = rowRef.current.type;
        originRow.type = rowRef.current.type;
        originItem.type = rowRef.current.type;
        newData.splice(index, 1, { ...item, ...row });
        originData.splice(index, 1, { ...originItem, ...originRow });

        events.forEach((el: any) => {
          if (el.id === item.id) {
            scheduleService.updateEvent(el.id, {
              ...item,
              date: mapDateToObject(row.date, row.time),
              time: mapDateToObject(row.date, row.time),
            });
          }
        });

        // eventsUpdate(newEvents);
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  let newCols: Column[] = [...createCols()];
  newCols = newCols.map((el) => {
    if (el.title === 'Type') {
      const { ...temp } = el;
      temp.render = (type: string) => (
        <Tag
          color={allTypes.find((t) => t.value === type)?.color}
        >
          {type.toUpperCase()}
        </Tag>
      );
      return temp;
    }
    if (el.title === 'Organizer') {
      const { ...temp } = el;
      temp.render = ((org: string) => <OrganizerCell name={org} />);
      return temp;
    }
    return el;
  });

  newCols.push({
    title: 'Operation',
    dataIndex: 'operation',
    render: (_: any, record: IEvent) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <button
            onClick={() => save(record.id)}
            style={{
              marginRight: 8,
            }}
            className={styles.button}
            type="button"
          >
            Save
          </button>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <button className={styles.button} type="button">Cancel</button>
          </Popconfirm>
        </span>
      ) : (
        <button disabled={editingKey !== ''} className={styles.button} onClick={() => editHandler(record)} type="button">
          Edit
        </button>
      );
    },
  });

  const mergedColumns = newCols.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: IEvent) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Form form={form} component={false}>
        <Table
          size="middle"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};

const mapStateToProps = ({ events, loading }: any): any => ({
  events,
  loading,
});

export default compose(
  withScheduleService(),
  connect(mapStateToProps),
)(TableForMentor);
