const sql = require("./db.js");

//constructor
const Register = function(register){
    this.id = register.id,
    this.username = register.username,
    this.password = register.password
    this.access_token = register.access_token
}

Register.register = (register, result) => {
    sql.query("INSERT INTO users SET ?", register, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("New User: ", { id: res.insertId, ...register });
        result(null, { result:true, id: res.insertId, ...register });
    });
};

module.exports = Register;