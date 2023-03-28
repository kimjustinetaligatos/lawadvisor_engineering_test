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

Tasks.findAll = (user, result) => {
    let query = "SELECT * FROM tasks WHERE username = ? ORDER BY SORT ASC";

    sql.query(query, user.username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tasks: ", res);
        result(null, res);
    });
};


Tasks.update = (task, result) => {
    sql.query("UPDATE tasks SET name = ?, description = ? WHERE id = ? and username = ?", [task.name,task.description,task.id,task.username], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Updated Tasks: ", { ...task });
        result(null, { result:true, ...task });
    });
};

Tasks.delete = (id, username, result) => {

    //GET THE TASK DETAILS
    let query = "SELECT * FROM tasks WHERE username = ? AND id = ? LIMIT 1";
    sql.query(query, [username, id], (err, resSelect) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //IF TASK FOUND
        if (resSelect.length) {
            sql.query("DELETE FROM tasks WHERE id = ? and username = ?", [id, username], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {

                    result({ kind: "not_found" }, null);
                    return;
                }else {
                    console.log("deleted task with id: ", id);
                    //result(null, res);

                    //RE-ARRANGE SORTING
                    sql.query("UPDATE tasks SET sort = sort - 1 WHERE sort > ? and username = ?", [resSelect[0].sort, username], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        if (res.affectedRows == 0) {

                            result({ kind: "not_found" }, null);
                            return;
                        }else {
                            console.log("Task sorting arranged");
                            result(null, res);
                        }


                    });
                }


            });
        }else{
            result(null, resSelect);
            return;
        }
    });


};

Tasks.sort = (task, move, result) => {

    //GET THE TASK DETAILS
    let query = "SELECT * FROM tasks WHERE username = ? AND id = ? LIMIT 1";
    sql.query(query, [task.username, task.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        //IF TASK FOUND
        if (res.length){
            const current_sort = res[0].sort;
            if(move == "up"){

                //UPPER TASK MOVE 1 DOWN
                sql.query("UPDATE tasks SET sort = sort + 1 WHERE sort = ? AND username = ?", [(current_sort-1), task.username], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    if (res.affectedRows == 0) {

                        return result({ kind: "not_found" }, null);
                    }

                    console.log("updated task with sort: ", (current_sort - 1));

                    //CURRENT TASK MOVE 1 UP
                    sql.query("UPDATE tasks SET sort = sort-1 WHERE id = ? AND username = ?", [task.id, task.username], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        if (res.affectedRows == 0) {

                            result({ kind: "not_found" }, null);
                            return;
                        }

                        console.log("updated task with sort: ", (current_sort - 1));
                        result(null, {result:true, message: "task sorted"});
                        return;

                    });
                });

            }else{

                //UPPER TASK MOVE 1 UP
                sql.query("UPDATE tasks SET sort = sort - 1 WHERE sort = ? AND username = ?", [(current_sort+1), task.username], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    if (res.affectedRows == 0) {

                        return result({ kind: "not_found" }, null);
                    }

                    console.log("updated task with sort: ", (current_sort + 1));

                    //CURRENT TASK MOVE 1 DOWN
                    sql.query("UPDATE tasks SET sort = sort+1 WHERE id = ? AND username = ?", [task.id, task.username], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        if (res.affectedRows == 0) {

                            result({ kind: "not_found" }, null);
                            return;
                        }

                        console.log("updated task with sort: ", (current_sort + 1));
                        result(null, {result:true, message: "task sorted"});
                        return;

                    });
                });

            }
        }else{
            return result(null, {result:false, message: "no task found"})
        }



        console.log("tasks found: ", res[0]);
        //result(null, res);
    });
};

Tasks.move = (task, result) => {
    sql.query("UPDATE tasks SET status = ? WHERE id = ? and username = ?", [task.status,task.id,task.username], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Moved Tasks: ", { ...task });
        result(null, { result:true, ...task });
    });
};


module.exports = Tasks;