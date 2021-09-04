import { RoleAccount, Subjects } from '../..';

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: {
    id: string;
    role: RoleAccount;
    isMFA: boolean;
    username: string;
    email: string;
    [key: string]: any;
  };
}
