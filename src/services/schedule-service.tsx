import { IEvent, IOrganizer } from '../interfaces';

class ScheduleService {
  apiBase = 'https://rs-react-schedule.firebaseapp.com/api/team/team19';
  async getResource(url: string): Promise<any> {
    const res = await fetch(`${this.apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}${url}, received ${res.status}`);
    }

    const data = await res.json();

    return data;
  }

  async postResource(url: string, body: IEvent | IOrganizer): Promise<any> {
    const res = await fetch(`${this.apiBase}${url}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}${url}, received ${res.status}`);
    }

    const data = await res.json();

    return data;
  }

  async putResource(url: string, body: IEvent | IOrganizer): Promise<any> {
    const res = await fetch(`${this.apiBase}${url}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}${url}, received ${res.status}`);
    }

    const data = await res.json();

    return data;
  }

  async deleteResource(url: string): Promise<any> {
    const res = await fetch(`${this.apiBase}${url}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.apiBase}${url}, received ${res.status}`);
    }

    const data = await res.json();

    return data;
  }

  getAllEvents = async (): Promise<IEvent[]> => {
    const events = await this.getResource('/events/');

    return events.data;
  };

  getEvent = async (id: string): Promise<IEvent> => {
    const event = await this.getResource(`/event/${id}/`);

    return event;
  };

  postEvent = async (body: IEvent): Promise<IEvent> => {
    const event = await this.postResource('/event/', body);

    return event;
  };

  updateEvent = async (id: string, body: IEvent): Promise<IEvent> => {
    const event = await this.putResource(`/event/${id}`, body);

    return event;
  };

  deleteEvent = async (id: string): Promise<IEvent> => {
    const event = await this.deleteResource(`/event/${id}`);

    return event;
  };

  getAllOrganizers = async (): Promise<any> => {
    const organizers = await this.getResource('/organizers/');

    return organizers;
  };

  getOrganizer = async (id: string): Promise<IOrganizer> => {
    const organizer = await this.getResource(`/organizer/${id}/`);

    return organizer;
  };

  postOrganizer = async (body: IOrganizer): Promise<IOrganizer> => {
    const organizer = await this.postResource('/organizer/', body);

    return organizer.data;
  };

  updateOrganizer = async (id: string, body: IOrganizer): Promise<IOrganizer> => {
    const organizer = await this.putResource(`/organizer/${id}`, body);

    return organizer;
  };

  deleteOrganizer = async (id: string): Promise<IOrganizer> => {
    const organizer = await this.deleteResource(`/organizer/${id}`);

    return organizer;
  };
}

export default ScheduleService;
