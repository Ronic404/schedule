/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { List, Card } from 'antd';
import { connect } from 'react-redux';
import CustomTag from '../custom-tag';
import { changeTaskNumber } from '../../actions';
import data from '../data';
import taskTypes, { textColor } from '../task-types';

import styles from './list-structure.module.css';

function ListContainer({ changeTaskNumber }: any): ReactElement {
  const taskNumberChange = (taskNumber: any): void => {
    changeTaskNumber(taskNumber);
  };

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
              extra={<Link to={`/task/${item.key}`} onClick={() => taskNumberChange(item.key)}>More</Link>}
            >
              <p className={styles.taskText}>{item.name}</p>
            </Card>
          </Card.Grid>
        )}
      />
    </Card>
  );
}

const mapDispatchToProps = {
  changeTaskNumber,
};

export default connect(null, mapDispatchToProps)(ListContainer);
