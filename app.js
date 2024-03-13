const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const routes  = require("./routes/index");
const { connectdb } = require("./connection/connection");
const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectdb();

app.use("/v1", routes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`connection succesfully ${3000}`);
});
