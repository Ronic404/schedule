type TimeType = {
  hour: number,
  minute: number,
};

export interface IEvent {
  id?: string,
  date?: number[],
  time: TimeType | null,
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
