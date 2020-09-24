/* eslint-disable no-shadow */
import React from 'react';
import { Modal, Button } from 'antd';

import { TableDownloadProps } from '../../interfaces';
import styles from './table-download-modal.module.css';

const TableDownloadModal: React.FC<TableDownloadProps> = ({
  visible,
  setVisible,
  PDFTable,
}: TableDownloadProps): React.ReactElement => {
  const handleVisibility = (visible: boolean) => () => setVisible(visible);

  return (
    <Modal
      visible={visible}
      title="Save schedule"
      onCancel={handleVisibility(false)}
      onOk={handleVisibility(false)}
    >
      <Button className={styles['table-download-modal__button']} onClick={() => PDFTable?.save()} block>pdf</Button>
    </Modal>
  );
};

export default TableDownloadModal;
