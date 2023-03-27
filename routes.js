module.exports = app => {
    const todos = require("./controllers.js");
    let router = require("express").Router();

    //REGISTER
    router.post("/register", todos.register);

    app.use('/api/todos', router);
}