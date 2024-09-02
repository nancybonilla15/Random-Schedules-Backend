const express = require("express");
const app = express();
const cors = require("cors");

require("./database");

app.use(cors());
app.use(express.json());

app.use(require("./routes/index"));
app.use(require("./routes/authenticacion"));
app.use(require("./routes/masters"));
app.use(require("./routes/users"));
app.use(require("./routes/classes"));
app.use(require("./routes/subjects"));
app.use(require("./routes/students"));

app.listen(3000);
console.log("Server on port: " + 3000);
