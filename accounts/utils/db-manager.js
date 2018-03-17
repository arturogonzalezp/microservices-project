const fs = require('fs');
const dbPath = 'accounts.json';
module.exports = {
    add: (email,password,name) => {
        var db = module.exports.getAll();
        if(module.exports.get(email))
            return false;
        db[email] = {
            email: email,
            password: password,
            name: name
        };
        fs.writeFileSync(dbPath,JSON.stringify(db));
        return true;
    },
    delete: (email) => {
        var db = module.exports.getAll();
        if(db[email]){
            delete db[email];
            fs.writeFileSync(dbPath,JSON.stringify(db));
            return true;
        }else{
            return false;
        }
    },
    get: (email) => {
        var db = module.exports.getAll();
        return (db[email]) ? db[email] : null;
    },
    getAll: () => {
        var strDB = fs.readFileSync(dbPath).toString();
        return (strDB != '') ? JSON.parse(strDB) : {};
    },
    initialize: () => {
        if(!fs.existsSync(dbPath)){
            fs.writeFileSync(dbPath, "{}");
            console.log("The database was created!");
        }else{
            console.log('The database already exists!');
        }
    }
};