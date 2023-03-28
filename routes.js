module.exports = app => {
    const controller = require("./controllers.js");
    let router = require("express").Router();

    //REGISTER
    router.post("/register", controller.register);

    //REGISTER
    router.post("/login", controller.login);

    //CREATE TASK
    router.post("/create", controller.create);

    app.use('/api/todos', router);
}