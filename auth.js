const Users = require("./model.users.js");


module.exports = (req, res, next) => {
    try {

        //AUTHENTICATE USER
        const user = new Users({
            username: req.body.username,
            access_token: req.body.access_token,
        });
        Users.authenticate(user,(err, data) => {
            if (err){
                res.status(500).send({
                    message:
                        err.message || "Error Saving Car Brand"
                });
                return;
            }
            else {
                if(!data.length){
                    return res.status(403).send({result: false, message: "Access Denied"});
                }else{
                    next();
                }

            };
        });

    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};