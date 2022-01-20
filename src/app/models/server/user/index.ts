export * from './roles';
import { FieldValue } from 'firebase/firestore';
import { Employee, Recruiter } from './roles';

export interface User {
  uuid: string;
  name: string | null;
  photoURL: string | null;
  email: string;
  country: string | null;
  about?: string | null;
  roleId?: string | null;
  role?: Employee | Recruiter | null;
  created: FieldValue;
  updated?: FieldValue;
}
