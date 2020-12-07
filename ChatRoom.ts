import { Misc } from "./Misc";
import { User } from './User';
import { SuperUser } from './Superuser';


export class ChatRoom {
    private userList: User[];
    constructor() {
        this.userList = [];
    }

    addUser(...user: User[]): void {
        this.userList.push(...user);
    }

    changeUserPassword(user: User, password: string): void {
        Misc.isUserInChatroom(user, this.userList);
        user.changePassword(password);
    }

    changeUserEmail(user: User, email: string): void {
        Misc.isUserInChatroom(user, this.userList);
        user.changeEmail(email);
    }

    editUserPassword(superuser: SuperUser, user: User, password: string): void {
        Misc.passwordCheck(password);
        Misc.isUserInChatroom(superuser, this.userList);        
        Misc.isUserInChatroom(user, this.userList);
               
        const [usr] = this.userList.filter(usr => usr.id === user.id)
        usr.password = password;
    }

    editUserAccessLevel(superuser: SuperUser, user: User): void {
        Misc.isUserInChatroom(superuser, this.userList);        
        Misc.isUserInChatroom(user, this.userList);

        const [usr] = this.userList.filter(usr => usr.id === user.id);
        usr.accessLevel = "admin";
    }
}