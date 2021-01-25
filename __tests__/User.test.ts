import { User } from "../User";
import { SuperUser } from "../Superuser";
import { ChatRoom } from "../ChatRoom";

/*

- Do chatu dołącza 8 użytkowników.
- drugi raz ta sama osoba zostaje dodana - powoduje błąd
- hasło 1 usera wymaga poprawy bo nie spełnia wymogów - error
- 3 userów zdecydowało się na zmianę hasła
- 2 userów zmieniło email, który muszą aktualizować na czacie
- 1 superuser zmienia hasła dla 2 zwykłych userów
 - dochodzi do pomyłki i wpisuje się usera który nie istnieje na czacie - błąd
- 2 superuserów zmienia dostęp dla 2 zwykłych userów
- 3 userów postanowiło się usunąć z czatu

*/

const chatRoom = new ChatRoom();





describe('In chat room', () => {
    describe('10 users created account', () => {
        const user1 = new User("Matt", "Dela", "asdsadsd3#ffdfF", "sda@sdsa.pl", new Date("01-13-1990"), "m");
        const user2 = new User("Rob", "Halford", "asdsadssadd3#ffdF", "sddsaa@sdsa.pl", new Date("12-13-1978"), "m");
        const user3 = new User("Adam", "Drag", "assdsadeedsadsd3#ffdF", "sda@sdsdaa.dpl", new Date("01-18-1990"), "m");
        const user4 = new User("Kaja", "Pas", "asdsdasadsd3#ffdF", "sd23a@sdsadsa.pl", new Date("11-10-1995"), "f");
        const user5 = new User("Marc", "Toll", "asdssdaadsd3#ffdF", "sddaa@sddsasa.pl", -13000, "m");
        const user6 = new SuperUser("Roland", "Zach", "sadsadsd3$%%dsD", "sdsadsd@hfg.d", new Date('07-23-1980'), "m");
        const user7 = new SuperUser("Rob", "Zachar", "sadsadffsd3$%%dsD", "sdsadsdasd@sadhfg.d", new Date('09-21-1999'), "m");
        const user8 = new SuperUser("Bogdan", "Lach", "sadssdsaadsd3$%%dsD", "sdsadsd@dsahfg.d", new Date('03-01-2005'), "m");
        const user9 = new SuperUser("Zbigniew", "Ach", "sadsdasadsd3$%%dsD", "sdsadsds34ad@hfg.d", new Date('10-10-1994'), "m");
        const user10 = new SuperUser("Olek", "Tach", "sadssdadsd3$%%dsD", "sdsadssadd@hfg.d", new Date('02-14-1990'), "m");
    
        test('and 8 are joining to the chat room', () => {
            const userListLength = 8;
            const userListContent = [user3, user4, user5, user6, user7, user8, user9, user10];
    
            chatRoom.addUser(user3, user4, user5, user6, user7, user8, user9, user10);
            expect(chatRoom.userList).toHaveLength(userListLength);
            expect(chatRoom.userList).toEqual(userListContent);
        });
    
        test('for second time same user beeing added to chat room', () => {
            expect(() => chatRoom.addUser(user3)).toThrowError('User is already in chat room.');
        });
    
        test('one more user created account with wrong password parameters', () => {
            expect(() => new User("Matt", "Dela", "asdsadsd3#ffdf", "sda@sdsa.pl", "1990-01-13", "m")).toThrowError("Password should have at least: 8 digits, one uppercase letter, one number, one special-sign.");
        });

        test('3 users decided to change password', () => {
            const prevUser3Pass = 'assdsadeedsadsd3#ffdF';
            const newUser3Pass = 'nnoweHaslo(23';

            const prevUser5Pass = "asdssdaadsd3#ffdF";
            const newUser5Pass = "fresHandFunky7&";

            const prevUser7Pass = "sadsadffsd3$%%dsD";
            const newUser7Pass = "imSuper3!!";
            
            expect(user3.password).toEqual(prevUser3Pass);
            chatRoom.changeUserPassword(user3, newUser3Pass);
            expect(user3.password).toEqual(newUser3Pass);

            expect(user5.password).toEqual(prevUser5Pass);
            chatRoom.changeUserPassword(user5, newUser5Pass);
            expect(user5.password).toEqual(newUser5Pass);

            expect(user7.password).toEqual(prevUser7Pass);
            chatRoom.changeUserPassword(user7, newUser7Pass);
            expect(user7.password).toEqual(newUser7Pass);

        });

        test('2 users changed email', () => {
            const prevUser4Email = "sd23a@sdsadsa.pl";
            const newUser4Email = "usr4@mail.com";

            const prevUser6Email = "sdsadsd@hfg.d";
            const newUser6Email = "fresh@mail.pl";

            expect(user4.email).toEqual(prevUser4Email);
            expect(user6.email).toEqual(prevUser6Email);

            chatRoom.changeUserEmail(user4, newUser4Email);
            chatRoom.changeUserEmail(user6, newUser6Email);

            expect(user4.email).toEqual(newUser4Email);
            expect(user6.email).toEqual(newUser6Email);

        });

        test('one user wanted to change email, but he typed it without "@"', () => {
            expect(() => chatRoom.changeUserEmail(user3, 'newmailmail.pl')).toThrowError("Invalid email.");
        });

        test('and one superuser channges passwords for 2 users', () => {
            const prevUser8Pass = "sadssdsaadsd3$%%dsD";
            const newUser8Pass = "nowecalEhasl)0";

            const prevUser9Pass = "sadsdasadsd3$%%dsD";
            const newUser9Pass = "slodkieCuksy(9)";

            expect(user8.password).toEqual(prevUser8Pass);
            expect(user9.password).toEqual(prevUser9Pass);

            chatRoom.editUserPassword(user10, user8, newUser8Pass);
            chatRoom.editUserPassword(user10, user9, newUser9Pass);

            expect(user8.password).toEqual(newUser8Pass);
            expect(user9.password).toEqual(newUser9Pass);
        });

        test('and by mistake superuser wants to edit password of user that does not exist in chat room', () => {
            expect(() => chatRoom.editUserPassword(user10, user1, 'noweHaslo()87')).toThrowError("This user does not exist in this chat room.");
        });

        test('and 2 superusers changing access level for 2 normal users', () => {
            const prevUserAccessLevel = "user";
            const newUserAccessLevel = "admin";

            expect(user5.accessLevel).toEqual(prevUserAccessLevel);
            expect(user4.accessLevel).toEqual(prevUserAccessLevel);

            chatRoom.editUserAccessLevel(user10, user5);
            chatRoom.editUserAccessLevel(user9, user4);

            const [newUser5] = chatRoom.userList.filter(user => user.id === user5.id);
            const [newUser4] = chatRoom.userList.filter(user => user.id === user4.id);

            expect(newUser5.accessLevel).toEqual(newUserAccessLevel);
            expect(newUser4.accessLevel).toEqual(newUserAccessLevel);
        });

        test('and 3 users decided to leave the chat room', () => {
            const [newUser5] = chatRoom.userList.filter(user => user.id === user5.id);
            const [newUser4] = chatRoom.userList.filter(user => user.id === user4.id);
            const properUserListLength = 5;
            const userListContent = [user3, user6, user9, user10, newUser5];
            

            chatRoom.deleteUser(newUser4);
            chatRoom.deleteUser(user7);
            chatRoom.deleteUser(user8);

            expect(chatRoom.userList).toHaveLength(properUserListLength);
            expect(chatRoom.userList).toEqual(userListContent);
        })
    });

    
})