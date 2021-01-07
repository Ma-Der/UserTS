import { Misc } from "./Misc";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  id: string;
  name: string;
  surname: string;
  birthDate: number | string | Date;
  password: string;
  gender: "m" | "f";
  email: string;
  accessLevel: string;
  changePassword(password: string): void;
  changeEmail(email: string): void;
}

export class User implements IUser {
  id: string;
  name: string;
  surname: string;
  birthDate: number | string | Date;
  password: string;
  gender: "m" | "f";
  email: string;
  accessLevel: string;

  constructor(
    name: string,
    surname: string,
    password: string,
    email: string,
    birthDate: number | string | Date,
    gender: "m" | "f"
  ) {
    Misc.isEmailValid(email);
    Misc.isStringEmpty(name);
    Misc.isStringEmpty(surname);
    Misc.isPasswordValid(password);
    Misc.genderCheck(gender);
    this.id = uuidv4();
    this.name = name;
    this.surname = surname;
    this.birthDate = Misc.dateCheck(birthDate);
    this.password = password;
    this.gender = gender;
    this.email = email;
    this.accessLevel = "user";
  }

  changePassword(password: string): void {
    Misc.isPasswordValid(password);
    this.password = password;
  }

  changeEmail(email: string): void {
    Misc.isEmailValid(email);
    this.email = email;
  }
}
