import { ChatRoom } from '../ChatRoom';
import { User } from '../User';
import { SuperUser } from '../Superuser';

const chat = new ChatRoom();

const karen = new User("Karen", "Nowak", "fdfdfFdf*9sdd", "karen@wp.pl", new Date(1992), 'f');
const michelle = new SuperUser("Michelle", "Molek", "dsaffafKL&3", 'sdsd@sdsds.uk', new Date(1899), 'f');
const jacek = new SuperUser("Jacek", "Kowal", "sdsdD#fdfaF34*&fdf", "jacek@onet.pl", new Date(1994), 'm');

describe('ChatRoom test method behavior', () => {
    it('addUser should add user to user list ', () => {
        chat.addUser(karen, michelle, jacek);
        expect(chat.userList).toHaveLength(3);
        expect(chat.userList).toEqual([karen, michelle, jacek]);
    });

    it('changeUserPassword should change given user password', () => {
        chat.changeUserPassword(karen, 'karenKaren90#$');
        expect(chat.userList[0].password).toBe('karenKaren90#$');
    });

    it('changeUserEmail should change given user email', () => {
        chat.changeUserEmail(karen, 'karenNew@wp.pl');
        expect(chat.userList[0].email).toBe('karenNew@wp.pl');
    });

    it('editUserPassword should edit given user password by given superuser.', () => {
        chat.editUserPassword(michelle, karen, 'NowakKaren90$');
        expect(chat.userList[0].password).toBe('NowakKaren90$');
    });

    it('editUserAccessLevel should change given user accesslevel by superuser and upgrade normal user to superuser.', () => {
        chat.editUserAccessLevel(michelle, karen);
        expect(chat.userList).toHaveLength(3);
        expect(chat.userList[1].accessLevel).toEqual('admin');
    });

    it('deleteUser should delete user from user list', () => {
        chat.deleteUser(jacek);
        expect(chat.userList).toHaveLength(2);
    });
});

const tom = new User('Tom', 'Seleck', "robotysatutajsdfdsadfF9*ffdf",'sdsdsa@sds.pl', -12979, 'm');

describe('ChatRoom tests for errors', () => {
    it('addUser should only accept User insatance argument', () => {
        () => expect(chat.addUser('adsa')).toThrowError();
    });

    it('addUser should only add user if it is not already in user list', () => {
        () => expect(chat.addUser(michelle)).toThrowError();
    });

    it('changeUserPasssword should throw error if user is not in user list', () => {
        () => expect(chat.changeUserPassword(tom, 'adsdsdad4$#ddsD')).toThrowError();
    });

    it('changeUserEmail should throw error if user is not in user list', () => {
        () => expect(chat.changeUserEmail(tom, 'asdsadsa@dsdsd.ok')).toThrowError();
    });

    it('editUserPassword and editUserAccessLevel should throw error if either superuser or user does not exist in user list', () => {
        () => expect(chat.editUserPassword(tom, karen, 'asdasd#$ff3F')).toThrowError();
        () => expect(chat.editUserAccessLevel(tom, karen)).toThrowError();
    });

    it('deleteUser should throw error if user does not exist in user list', () => {
        () => expect(chat.deleteUser(tom)).toThrowError();
    });
});