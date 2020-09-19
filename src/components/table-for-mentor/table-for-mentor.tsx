import React, { useEffect, useRef, useState } from 'react';
import {
  Table, Input, Popconfirm, Form, DatePicker, Select, Tag,
} from 'antd';

import allData from '../data';
import allCols from '../columns';
import allTypes from '../task-types';

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

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: string;
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

const createCols = () => {
  const [...columns] = allCols;
  const temp = columns.map((data) => {
    const { ...newTemp } = data;
    delete newTemp.render;
    delete newTemp.filters;
    delete newTemp.onFilter;
    return newTemp;
  });
  return temp;
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(mapDateToString(originData));
  const [editingKey, setEditingKey] = useState('');
  const [dateStr, setDateStr] = useState('');
  const typeRef = useRef('');

  function onDateChange(date: any, dateString: string) {
    setDateStr(dateString);
  }

  function onTypeChange(type: string) {
    typeRef.current = type;
  }

  const chooseInputNode = (title: string, record: Item) => {
    if (title === 'Date') return <DatePicker onChange={onDateChange} format="DD-MM-YYYY" />;
    if (title === 'Type') {
      return (
        <Input.Group compact>
          <Select onChange={onTypeChange} defaultValue={record.type}>
            {allTypes.map((type) => (
              <Option
                key={type.value}
                value={type.value}
              >
                {/* {type.value} */}
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
    inputType,
    record,
    index,
    children,
    ...restProps
  }: EditableCellProps) => {
    const inputNode = chooseInputNode(title, record);
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
    //   date: '',
    //   time: '',
    //   type: '',
    //   place: '',
    //   name: '',
    //   organizer: '',
    //   comment: '',
      ...record,
    });
    // setEditingKey(record.key);
  };

  useEffect(() => {
    const record = data.find((el) => typeof el.date === 'object');
    if (record) edit(record);
  }, [data]);

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
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: string) => {
    try {
      const row = (await form.validateFields()) as Item;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item: Item = newData[index];
        item.date = dateStr;
        row.date = dateStr;
        item.type = typeRef.current;
        row.type = typeRef.current;
        newData.splice(index, 1, { ...item, ...row });
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

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      editable: true,
      inputType: 'Date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      editable: true,
      inputType: 'text',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      editable: true,
      inputType: 'text',
      render: (type: string) => (
        <Tag
          color={allTypes.find((t) => t.value === type)?.color}
        >
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Place',
      dataIndex: 'place',
      editable: true,
      inputType: 'text',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
      inputType: 'text',
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      editable: true,
      inputType: 'text',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      editable: true,
      inputType: 'text',
    },

    {
      title: 'operation',
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
              type="button"
            >
              Save
            </button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <button type="button">Cancel</button>
            </Popconfirm>
          </span>
        ) : (
          <button disabled={editingKey !== ''} onClick={() => editHandler(record)} type="button">
            Edit
          </button>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.inputType,
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
