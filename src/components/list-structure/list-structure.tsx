import React, { ReactElement } from 'react';
import { List, Tag } from 'antd';
import data from '../data';
import taskTypes from '../task-types';

import styles from './list-structure.module.css';

export default function ListStructure(): ReactElement {
  return (
    <List
      className={styles.list}
      itemLayout="horizontal"
      dataSource={data}
      bordered
      size="small"
      renderItem={(item) => (
        <List.Item className={styles.item} key={item.key}>
          <Tag
            className={styles.type}
            color={taskTypes.find((task) => task.value === item.type)?.color}
          >
            {item.type.toUpperCase()}
          </Tag>
          <div className={styles.main}>
            <p className={styles.date}>{item.date}</p>
            <p className={styles.name}>{item.name}</p>
          </div>
        </List.Item>
      )}
    />
  );
}
