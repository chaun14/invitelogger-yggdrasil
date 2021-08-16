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

ws.on("open", () => {
  setInterval(() => {
    // ws.send("welcome", { id: 1, type: "invlogController" });
    ws.emit("welcome", { id: 1, type: "invlogController" });
  }, 1000);
  console.log("hello");
});

ws.on("re", (data) => {
  console.log(data);
});
