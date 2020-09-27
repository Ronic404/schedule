/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement } from 'react';
import { List, Card } from 'antd';
import CustomTag from '../custom-tag';
import data from '../data';
import taskTypes, { textColor } from '../task-types';

import styles from './list-structure.module.css';

export default function ListContainer(): ReactElement {
  return (
    <Card className={styles.list} title="Tasks list" bodyStyle={{ padding: 0 }}>
      <List
        dataSource={data}
        pagination={{ pageSize: 12 }}
        renderItem={(item) => (
          <Card.Grid className={styles.item} key={item.key}>
            <CustomTag
              tagClassName={styles.type}
              backgroundColor={taskTypes.find((task) => task.value === item.type)?.color}
              color={textColor.color}
              text={item.type.toUpperCase()}
            />
            <Card
              className={styles.taskCard}
              type="inner"
              title={item.dateTime.format('DD-MM-YYYY HH:mm')}
              extra={<a href="#">More</a>}
            >
              <p className={styles.taskText}>{item.name}</p>
            </Card>
          </Card.Grid>
        )}
      />
    </Card>
  );
}
