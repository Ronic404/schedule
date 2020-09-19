import React, {
  FC, ReactElement, useEffect, useRef, useState,
} from 'react';
import {
  Table, Input, Popconfirm, Form, DatePicker, Select, Tag,
} from 'antd';
import moment from 'moment';

import styles from './table-for-mentor.module.css';
import allCols from '../columns';
import allData from '../data';
import allTypes from '../task-types';
import OrganizerCell from '../organizer-cell';

const { Option } = Select;

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
}

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
    record: Item;
    index: number;
    children: React.ReactNode;
  }

const createOriginData = () => {
  const [...originData] = allData;
  const temp = originData.map((data) => {
    const { ...newTemp } = data;
    delete newTemp.done;
    return newTemp;
  });
  return temp;
};

const originData = createOriginData();

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

const mapDateToString = (data: Item[]) => {
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

const EditableTable: FC = (): ReactElement => {
  const [form] = Form.useForm();
  const [data, setData] = useState(mapDateToString(originData));
  const [editingKey, setEditingKey] = useState('');
  const [dateStr, setDateStr] = useState('');
  const rowRef = useRef({ type: '', organizer: '' });

  function onDateChange(date: any, dateString: string) {
    setDateStr(dateString);
  }

  function onTypeChange(type: string) {
    rowRef.current.type = type;
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
                required: true,
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

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Item) => {
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
  const editHandler = (record: Item) => {
    const temp = originData.map((el, i) => {
      if ((i + 1).toString() !== record.key) {
        const { ...tempEl } = el;
        const t: Item[] = [];
        t.push(tempEl);
        return mapDateToString(t)[0];
      }
      return el;
    });
    setData(temp);
    setEditingKey(record.key);
    setDateStr(record.date);
    rowRef.current.type = record.type;
  };

  const cancel = () => {
    setEditingKey('');
    let dataToMap = data.filter((el) => typeof el.date === 'object');
    dataToMap = mapDateToString(dataToMap);
    const newData = data.map((el) => {
      if (el.key === dataToMap[0].key) return dataToMap[0];
      return el;
    });
    setData(newData);
  };

  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as Item;
      const originRow = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item: Item = newData[index];
        const originItem: Item = originData[index];
        item.date = dateStr;
        originItem.date = moment(dateStr, dateFormat);
        row.date = dateStr;
        originRow.date = moment(dateStr, dateFormat);
        item.type = rowRef.current.type;
        originItem.type = rowRef.current.type;
        row.type = rowRef.current.type;
        originRow.type = rowRef.current.type;
        newData.splice(index, 1, { ...item, ...row });
        originData.splice(index, 1, { ...originItem, ...originRow });
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
    render: (_: any, record: Item) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <button
            onClick={() => save(record.key)}
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
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <Form form={form} component={false}>
        <Table
          size="middle"
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
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

export default EditableTable;
