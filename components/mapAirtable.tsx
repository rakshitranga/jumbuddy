export interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    friendids: string;
    gradyear: string; 
    major: string;
    interests: string;
    classes: string; 
    bio: string; 
    friendrequests: string; 
    avatarlink: string;
  }

export interface Event {
    day: string;
    month: string;
    time: string;
    title: string;
    location: string;
    desc: string; 
}

export function mapAirtableUser(record: any): User {
    return { ...record.fields } as User;
  }

export function mapAirtableEvent(record: any): Event{
  return record as Event;
}
  