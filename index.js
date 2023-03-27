const express = require('express');
const app = express();

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// default get route
app.get("/", (req, res) => {
    res.json({ message: "LawAdvisor Engineering Test" });
});

//call routes
require("./routes.js")(app);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})