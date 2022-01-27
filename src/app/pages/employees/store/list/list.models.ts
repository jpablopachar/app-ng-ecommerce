import { Employee, User as DBUser } from "@app/models/server";

export interface User extends DBUser {
  role: Employee
}