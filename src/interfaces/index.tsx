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