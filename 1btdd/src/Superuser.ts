import { User } from "./User";

export class SuperUser extends User {
  accessLevel: string;
  constructor(
    name: string,
    surname: string,
    password: string,
    email: string,
    birthDate: string | number | Date,
    gender: "m" | "f"
  ) {
    super(name, surname, password, email, birthDate, gender);
    this.accessLevel = "admin";
  }
}
