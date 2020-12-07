import is from 'is_js';
import { Misc } from './Misc';
import { v4 as uuidv4 } from 'uuid';

export class User {
    id: string;
    name: string;
    surname: string;
    birthDate: number | string | Date;
    password: string;
    gender: string;
    email: string;
    accessLevel: string;

    constructor(name: string, surname: string, password: string, email: string, birthDate: number | string | Date, gender: string) {
        if(is.not.email(email)) throw new Error("Invalid email.");
        this.id = uuidv4();
        this.name = name;
        this.surname = surname;
        if(is.empty(this.name)) throw new Error('Name is empty. Please type your name.');
        if(is.empty(this.surname)) throw new Error('Surname is empty. Please type your surname.');
        this.birthDate = Misc.dateCheck(birthDate);
        this.password = password;
        Misc.passwordCheck(this.password);
        this.gender = gender;
        Misc.genderCheck(this.gender);
        this.email = email;
        this.accessLevel = "user";
    }

    changePassword(password: string): void {
        Misc.passwordCheck(password);
        this.password = password;
    }

    changeEmail(email: string): void {
        if(is.not.email(email)) throw new Error("Invalid email.");
        this.email = email;
    }
}