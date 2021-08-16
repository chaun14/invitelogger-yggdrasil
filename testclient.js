const jwt = require("jsonwebtoken");
const config = require("./config.json");

var token = jwt.sign({ name: "iostreamer" }, config.key, {});

const socket = require("socket.io-client")("http://localhost:2000");

socket.on("connect", () => {
  console.log("connected to smth");
  socket.emit("authenticate", { token });
});

socket.on("welcome", () => {
  console.log("we are authenticated");

  socket.send("welcome", { id: 1, type: "invlogController" });
});

socket.on("error", (err) => {
  console.log(err);
});
