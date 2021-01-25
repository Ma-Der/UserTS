 import { User } from './User';
import { SuperUser } from './Superuser';
import { ChatRoom } from './ChatRoom';

const chat = new ChatRoom();

const tom = new User('Tom', 'Seleck', "robotysatutajsdfdsadfF9*ffdf",'sdsdsa@sds.pl', '1999-01-04', 'm');
const karen = new User("Karen", "Nowak", "fdfdfFdf*9sdd", "karen@wp.pl", new Date('1992-01-02'), 'f');
const michelle = new SuperUser("Michelle", "Molek", "dsaffafKL&3", 'sdsd@sdsds.uk', new Date('03-13-1992'), 'f');
const jacek = new SuperUser("Jacek", "Kowal", "sdsdD#fdfaF34*&fdf", "jacek@onet.pl", '1999-01-04', 'm');

chat.addUser(tom, michelle, karen, jacek);
console.log(chat);
console.log('-------------------------------------------------------------------------');
chat.editUserPassword(michelle, tom, 'sddadsdsa4F*');

chat.editUserAccessLevel(michelle, tom);

console.log(chat); 
