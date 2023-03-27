module.exports = app => {
    const todos = require("./controllers.js");
    let router = require("express").Router();

    app.use('/api/todos', router);
}