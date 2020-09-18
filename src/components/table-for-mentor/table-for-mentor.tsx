import React, { useEffect, useState } from 'react';
import {
  Table, Input, InputNumber, Popconfirm, Form, DatePicker, Button,
} from 'antd';

import allData from '../data';
import allCols from '../columns';

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
    title: any;
    inputType: any;
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

const mapStringToDate = () => {

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

// for (let i = 0; i < 100; i += 1) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(mapDateToString(originData));
  const [editingKey, setEditingKey] = useState('');
  const [dateStr, setDateStr] = useState('');

  function onChange(date: any, dateString: any) {
    console.log('date', dateString);
    setDateStr(dateString);
  }

  const chooseInputNode = (type: any) => {
    if (type === 'Date') return <DatePicker onChange={onChange} format="DD-MM-YYYY" />;
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
    const inputNode = chooseInputNode(inputType);
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

  //   console.log('origin', mapDateToString(originData), 'to string', originData);

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
    console.log('data', data);
    const record = data.find((el) => typeof el.date === 'object');
    console.log('record', record);
    console.log('key', editingKey);
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
        console.log('item', item);
        newData.splice(index, 1, { ...item, ...row });
        console.log('new data', row);
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
      {/* <Button type="default" style={{ marginBottom: 20 }} onClick={editHandler}>Edit</Button> */}
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
