import React from 'react';
import { List } from 'antd';
import data from '../data';

import styles from './list-structure.module.css';

export default function ListStructure() {
  return (
    <List
      className={styles.list}
      itemLayout="horizontal"
      dataSource={data}
      bordered
      size="small"
      renderItem={(item) => (
        <List.Item className={styles.item} key={item.key}>
          <img
            className={styles.marker}
            src="http://www.satnet.sk/wp-content/uploads/2020/01/678111-map-marker-512-300x300.png"
            alt="marker"
          />
          <div className={styles.main}>
            <p className={styles.date}>{item.date}</p>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.type}>{item.type}</p>
          </div>
        </List.Item>
      )}
    />
  );
}
