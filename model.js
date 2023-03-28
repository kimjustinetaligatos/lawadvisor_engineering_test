const sql = require("./db.js");

//constructor
const Tasks = function(task){
    this.id = task.id,
    this.username = task.username,
    this.sort = task.sort,
    this.name = task.name,
    this.description = task.description,
    this.status = task.status
}


Tasks.create = (task, result) => {
    sql.query("INSERT INTO tasks SET ?", task, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("New Tasks: ", { id: res.insertId, ...task });
        result(null, { result:true, id: res.insertId, ...task });
    });
};

Tasks.getLastSortPerUser = (username, result) => {
    let query = "SELECT * FROM tasks WHERE username = ? ORDER BY sort DESC LIMIT 1";

    sql.query(query, username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tasks: ", res);
        result(null, res);
    });
};

module.exports = Tasks;