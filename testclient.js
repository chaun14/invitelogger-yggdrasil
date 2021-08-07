const WebSocket = require("ws");
const jwt = require("jsonwebtoken");
const config = require("./config.json");

var token = jwt.sign({ name: "iostreamer" }, config.key, {});
console.log(token);

ws = new WebSocket("ws://localhost:2000", {
  headers: {
    token: token,
  },
});
