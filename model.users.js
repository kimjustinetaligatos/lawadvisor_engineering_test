const sql = require("./db.js");

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

//constructor
const Users = function(register){
    this.id = register.id,
    this.username = register.username,
    this.password = register.password
    this.access_token = register.access_token
}

Users.register = (user, result) => {
    sql.query("INSERT INTO users SET ?", user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("New User: ", { id: res.insertId, ...user });
        result(null, { result:true, id: res.insertId, ...user });
    });
};

Users.login = (user, result) => {
    sql.query("SELECT * FROM users WHERE username = ? and password = ?", [user.username, user.password], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("user found: ", res.length);
        if(res.length){
            //UPDATE ACCES TOKEN
            const access_token = generateString(32).replace(/^\s+|\s+$/g, '');
            console.log(access_token);
            sql.query(
                "UPDATE users SET access_token = ? WHERE username = ?",
                [access_token, user.username],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    if (res.affectedRows == 0) {

                        result({ kind: "not_found" }, null);
                        return;
                    }

                    console.log("access token updated ", { ...res });
                    //result(null, { result:true, ...res });
                }
            );

            result(null, { result:true, ...res[0], access_token: access_token });
            return;
        }else{
            result(null, { result:false, message: "No Users Found" });
            return;
        }

    });
};

module.exports = Users;