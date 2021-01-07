import { Misc } from "./Misc";
import { IUser } from "./User";
import { SuperUser } from "./Superuser";

export interface IChatRoom {
  userList: IUser[];
  addUser(...user: IUser[]): void;
  changeUserPassword(user: IUser, password: string): void;
  changeUserEmail(user: IUser, email: string): void;
  editUserPassword(superuser: SuperUser, user: IUser, password: string): void;
  editUserAccessLevel(superuser: SuperUser, user: IUser): void;
  deleteUser(user: IUser): void;
  _fromUsertoSuperuser(user: IUser): SuperUser;
}

export class ChatRoom implements IChatRoom {
  userList: IUser[];
  constructor() {
    this.userList = [];
  }

  addUser(...user: IUser[]): void {
    user.forEach(usr => {
      this.userList.forEach(element => {
        if(element.id === usr.id) {
          throw new Error('User is already in chat room.');
        }
      })
    });
    this.userList.push(...user);
  }

  changeUserPassword(user: IUser, password: string): void {
    Misc.isUserInChatroom(user, this.userList);
    user.changePassword(password);
  }

  changeUserEmail(user: IUser, email: string): void {
    Misc.isUserInChatroom(user, this.userList);
    user.changeEmail(email);
  }

  editUserPassword(superuser: SuperUser, user: IUser, password: string): void {
    Misc.isPasswordValid(password);
    Misc.isUserInChatroom(superuser, this.userList);
    Misc.isUserInChatroom(user, this.userList);

    const [usr] = this.userList.filter((usr) => usr.id === user.id);
    usr.password = password;
  }

  editUserAccessLevel(superuser: SuperUser, user: IUser): void {
    Misc.isUserInChatroom(superuser, this.userList);
    Misc.isUserInChatroom(user, this.userList);

    const [usr] = this.userList.filter((usr) => usr.id === user.id);
   
    const newSuperuser = this._fromUsertoSuperuser(usr);
    this.deleteUser(usr);
    this.userList.push(newSuperuser);
  }
  deleteUser(user: IUser): void {
    Misc.isUserInChatroom(user, this.userList);
    const newUserList = this.userList.filter(
      (userOnList) => userOnList.id !== user.id
    );
    this.userList = newUserList;
  }

  _fromUsertoSuperuser(user: IUser): SuperUser {
    Misc.isUserInChatroom(user, this.userList);

    const newSuperuser = new SuperUser(
      user.name,
      user.surname,
      user.password,
      user.email,
      user.birthDate,
      user.gender
    );

    newSuperuser.id = user.id;
    return newSuperuser;
  }
}