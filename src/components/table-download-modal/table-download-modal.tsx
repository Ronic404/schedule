import React from 'react';
import { Modal, Button } from 'antd';
import { PDFExport } from '@progress/kendo-react-pdf';
import styles from './table-download-modal.module.css';

export interface TableDownloadProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  PDFTable?: PDFExport | null;
}

const TableDownloadModal: React.FC<TableDownloadProps> = ({
  visible,
  setVisible,
  PDFTable,
}): React.ReactElement => {
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
