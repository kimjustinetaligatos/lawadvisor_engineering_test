module.exports = app => {
    const controller = require("./controllers.js");

    //MIDDLEWARE AUTHENTICATION USING access_token
    const Auth = require("./auth.js");

    let router = require("express").Router();

    //REGISTER
    router.post("/register", controller.register);

    //REGISTER
    router.post("/login", controller.login);

    //CREATE TASK
    router.post("/create", Auth, controller.create);

    //FIND ALL TASK
    router.get("/read", Auth, controller.findAll);

    //UPDATE TASK DETAILS
    router.get("/update", Auth, controller.update);

    app.use('/api/todos', router);
}