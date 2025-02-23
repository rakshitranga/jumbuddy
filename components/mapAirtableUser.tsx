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

export function mapAirtableUser(record: any): User {
    return { ...record.fields } as User;
  }
  