const express = require("express");
const app = express();

require("./database");

app.use(express.json());

app.use(require("./routes/index"));
app.use(require("./routes/authenticacion"));

app.listen(3000);
console.log("Server on port: " + 3000);
