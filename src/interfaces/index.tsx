export interface IEvent {
  id?: string,
  key?: string,
  date?: any,
  time: any,
  type: string,
  place: string,
  name: string,
  organizer: string,
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
