const Tasks = require("./model.js");
const Users = require("./model.users.js");
const md5 = require('md5');

// REGISTER
exports.register = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }

    const user = new Users({
        username: req.body.username,
        password: md5(req.body.password),
    });

    // Save to database
    Users.register(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.send(data);
    });
};


// REGISTER
exports.login = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }

    const user = new Users({
        username: req.body.username,
        password: md5(req.body.password),
    });

    // Save to database
    Users.login(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.status(403).send(data);
    });
};

// CREATE TASK
exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }
    //GET LAST SORT VALUE
    Tasks.getLastSortPerUser(req.body.username, (err, data) => {
        if (err){
            res.status(500).send({
                message:
                    err.message || "Error Getting Sort Order"
            });
        }
        else{
            let lastSortPerUser = 1;
            if(data.length){
                lastSortPerUser = data[0].sort + 1;
            }
            console.log(lastSortPerUser)
            const task = new Tasks({
                username: req.body.username,
                sort: lastSortPerUser,
                name: req.body.name,
                description: req.body.description,
                status: req.body.status,
            });

            //Save to database
            Tasks.create(task, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Error"
                    });
                else res.send(data);
            });
        }
    });




};