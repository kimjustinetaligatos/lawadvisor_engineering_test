const Todos = require("./model.js");
const Register = require("./model.register.js");
const md5 = require('md5');

// REGISTER
exports.register = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }

    const register = new Register({
        username: req.body.username,
        password: md5(req.body.password),
    });

    // Save to database
    Register.register(register, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error Saving"
            });
        else res.send(data);
    });
};