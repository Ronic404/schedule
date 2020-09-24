import { PDFExport } from '@progress/kendo-react-pdf';

export interface IEvent {
  id: string,
  name: string,
  description: string,
  descriptionUrl: string,
  type: string,
  timeZone: string,
  dateTime: string,
  place: string,
  comment: string,
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
