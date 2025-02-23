export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
  }

export function mapAirtableUser(record: any): User {
    const { Email, Name, id, username } = record.fields;
    return {
      id, // assuming this is the unique id for the user
      name: Name,
      email: Email,
      username,
    };
  }
  