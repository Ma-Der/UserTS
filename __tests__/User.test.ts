import { User } from '../User';

const user1 = new User('Marta', 'Nowak', 'asDasd@90dfg', 'martan@now.op', '1988-05-13', 'f');

describe('User tests method behavior', () => {
    it('changePassword should change user password', () => {
        user1.changePassword('martaNowak88!!');
        expect(user1.password).toEqual('martaNowak88!!');
    });

    it('changeEmail should change user email', () => {
        user1.changeEmail('nowakMarta@op.wo');
        expect(user1.email).toEqual('nowakMarta@op.wo');
    });
});

describe('User tests for errors', () => {
    it('changePassword should accept only string', () => {
        () => expect(user1.changePassword(123)).toThrowError();
    });

    it('changePassword should throw error if password does not have: 8 digits, at least one: uppercase, special sign, number', () => {
        () => expect(user1.changePassword('martamarta4#')).toThrowError();
    });

    it('changeEmail should accept only string', () => {
        () => expect(user1.changeEmail(3210)).toThrowError();
    });

    it('changeEmail should throw error when email is incorrect', () => {
        () => expect(user1.changeEmail('sdadsdasd.pldsa.ok')).toThrowError();
    });
});
