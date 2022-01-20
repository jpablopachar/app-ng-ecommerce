import { User } from '@app/models/server';

export { Roles } from '@app/models/server/role';
export { Employee, Recruiter, User } from '@app/models/server/user';

export interface EmailPasswordCredentials {
  email: string;
  password: string;
}

export type UserCreateRequest = Omit<User, 'uid' | 'email' | 'created'>;
