import { PDFExport } from '@progress/kendo-react-pdf';
export interface IEvent {
  id?: string,
  key?: any,
  date?: any,
  time: any,
  type: string,
  place: string,
  name: string,
  organizer: string,
  task: string,
  comment: string,
  done?: boolean,
  hidden?: boolean,
}

export interface IOrganizer {
  id: string,
  name: string,
}

export interface IOptionItem {
  name: string,
  id: number,
}

export interface TableDownloadProps {
  visible: boolean,
  setVisible: (visible: boolean) => void,
  PDFTable?: PDFExport | null,
}

export interface TableContainerProps {
  setTableRef: (component: TableDownloadProps['PDFTable']) => void,
}
