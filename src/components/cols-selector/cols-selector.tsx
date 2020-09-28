import React, {
  FC, ReactElement, useEffect, useState,
} from 'react';
import {
  Checkbox, Dropdown, Button, Menu,
} from 'antd';

import styles from './cols-selector.module.css';

interface ColsSelectorProps {
    columns: {title: string, checked: boolean}[],
    onChangeCols: any,
}

const ColsSelector: FC<ColsSelectorProps> = ({ columns, onChangeCols }: ColsSelectorProps):
ReactElement => {
  const [cols, setCols] = useState<{title: string, checked: boolean}[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const menuHandler = (title: string) => {
    const tempCols = cols.map((col) => {
      const { ...temp } = col;
      if (temp.title === title) {
        temp.checked = !temp.checked;
      }
      return temp;
    });
    setCols(tempCols);
  };

  const saveHandler = () => {
    onChangeCols([...cols]);
    setVisible(false);
  };

  const menu = (
    <Menu>
      {cols.map((col) => (
        <Menu.Item key={col.title}>
          <Checkbox
            checked={col.checked}
            onClick={() => menuHandler(col.title)}
          >
            {col.title}
          </Checkbox>
        </Menu.Item>
      ))}
      <Menu.Item>
        <Button onClick={saveHandler}>Save</Button>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setCols(columns);
  }, [columns]);

  return (
    <Dropdown.Button
      className={styles.dropdown}
      overlay={menu}
      onClick={() => setVisible(!visible)}
      visible={visible}
    >
      Columns
    </Dropdown.Button>
  );
};

export default ColsSelector;
