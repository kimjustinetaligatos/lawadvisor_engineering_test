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
    router.put("/update", Auth, controller.update);

    //DELETE TASK
    router.delete("/delete/:id", Auth, controller.delete);

    //SORT TASKS
    router.put("/sort", Auth, controller.sort);

    //SORT TASKS
    router.put("/move", Auth, controller.move);

    app.use('/api/todos', router);
}