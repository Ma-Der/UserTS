import is from 'is_js';
import moment from 'moment';
import { User } from './User';

export class Misc {
    constructor() {}

    static isStringValid(str: string): void {
      if(is.empty(str) || is.space(str)) throw new Error("Empty string.");
    }

    static isUserInChatroom(user: User, list: User[]): void {
      if(is.falsy(list.includes(user))) throw new Error("This user does not exist in this chat room.");
    }

    static passwordCheck(pass: string): void {
        const re = /(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}/;
        is.setRegexp(re, 'alphaNumeric');
        if(is.not.alphaNumeric(pass)) throw new Error("Password should have at least: 8 digits, one uppercase letter, one number, one special-sign.");
    }

    static genderCheck(gender: string): string {
        if(is.empty(gender)) throw new Error('Empty string, choose "m" for male or "f" for female.');
        const gen = ['male', 'female'];
        switch(gender) {
            case 'm':
                gender = gen[0];
                return gender;
            case 'f':
                gender = gen[1];
                return gender;
            default:
              throw new Error("m - stands for male, f - stands for female");
        }
    }

    static dateCheck(input: number | string | Date): string {
            
            switch(true) {
              case (typeof input === 'number'):
                if(is.nan(input)) throw new Error("Input should be a number.");
                const num = moment().dayOfYear(+input);
                return num.format('MM/DD/YYYY'); 
          
              case (typeof input === 'string'):
                if(moment(input).format('MM/DD/YYYY') === 'Invalid date') throw new Error("Invalid date. Date format should be - MM/DD/YYYY");
                return moment(input).format('MM/DD/YYYY');
          
              case (moment.isDate(input)): 
                if(is.nan(moment(input).valueOf())) throw new Error("Invalid date.");
                return moment(input).format('MM/DD/YYYY');
              default: 
                return moment().format('MM/DD/YYYY');
            }
    }
}