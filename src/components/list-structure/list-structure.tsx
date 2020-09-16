import React from 'react';
import { List } from 'antd';
// import moment from 'moment';
import styles from './list-structure.module.css';

const data = [
  {
    key: '1',
    // date: moment().format('ll'),
    // time: moment().format('LT'),
    date: 111,
    time: 222,
    type: 'test',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: false,
  },
  {
    key: '2',
    // date: moment().format('ll'),
    // time: moment().format('LT'),
    date: 111,
    time: 222,
    type: 'start',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: true,
  },
  {
    key: '3',
    // date: moment().format('ll'),
    // time: moment().format('LT'),
    date: 111,
    time: 222,
    type: 'stream',
    place: 'ddddd',
    name: 'fffff',
    organizer: 'nastassiamilashevskaya',
    comment: 'jjjjj',
    done: false,
  },
];

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

// export default function ListStructure() {
//   return (
//     <>
//       <ul className={styles.list}>
//         {data.map((el) => (
//           <li className={styles.item} key={el.key}>
//             <div className={styles.plug} />
//             <div className={styles.main}>
//               <p className={styles.date}>{el.date}</p>
//               <p className={styles.name}>{el.name}</p>
//               <p className={styles.type}>{el.type}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// "http://www.satnet.sk/wp-content/uploads/2020/01/678111-map-marker-512-300x300.png"
