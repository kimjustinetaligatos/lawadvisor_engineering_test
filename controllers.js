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


exports.findAll = (req, res) => {

    const user = new Users({
        username: req.body.username,
    });

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }


    // Get All car brand in the database
    Tasks.findAll(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error Get"
            });
        else res.send(data);
    });
};


// UPDATE TASKS
exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Missing Parameter"
        });
    }

    const task = new Tasks({
        username: req.body.username,
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
    });

    // Save to database
    Tasks.update(task, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error"
            });
        else res.status(403).send(data);
    });
};

exports.delete = (req, res) => {
    Tasks.delete(req.params.id, req.body.username, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found task with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete task with id " + req.params.id
                });
            }
        } else res.send({ result:true, message: `task was deleted successfully!` });
    });
};