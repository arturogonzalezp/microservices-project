const assert = require('chai').assert;
const fs = require('fs');
const db = require('../accounts/utils/db-manager.js');
const test_user = {
    email: 'test@test.com',
    password: 'test123',
    name: 'Test Dummie'
}
describe('Accounts microservice', () => {
    it('Initialize database', () => {
        var message = (!fs.existsSync(db.dbPath)) ? 'The database was created!' : 'The database already exists!';
        assert.equal(db.initialize(), message);
    });
    it('Get non-existing user', () => {
        assert.equal(db.get(test_user.email),null);
    });
    it('Add user',() => {
        assert.equal(db.add(test_user.email,test_user.password,test_user.name), true);
    });
    it('Check not empty database', () =>{
        var db_size = Object.keys(db.getAll()).length;
        assert.isAtLeast(db_size, 1);
    });
    it('Add existing user',()=>{
        assert.equal(db.add(test_user.email,test_user.password,test_user.name), false);
    });
    it('Get existing user', () => {
        assert.deepEqual(db.get(test_user.email), test_user);
    });
    it('Delete existing user', () =>{
        assert.equal(db.delete(test_user.email), true);
    });
    it('Delete non-existing user',() =>{
        assert.equal(db.delete(test_user.email), false);
    });
});