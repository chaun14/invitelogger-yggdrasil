import yggConfig from "../config.json";
import { InvlogController } from "./components/invlogController";
import { InvlogShard } from "./components/invlogShard";
import { Authenticator } from "./modules/auth";
import { socketManager } from "./modules/socketManager";

import express from "express";
import http from "http";
import { Server } from "socket.io";
import colors from "colors";

export class YggdrasilServer extends Server {
  public config = yggConfig;
  public invlogShards: Map<number, InvlogShard>;
  public invlogControllers: Map<number, InvlogController>;
  public webServer: http.Server;
  public options: typeof yggConfig;

  public constructor(httpServer: http.Server) {
    super(httpServer, {});

    this.invlogShards = new Map();
    this.invlogControllers = new Map();

    this.webServer = httpServer;

    this.webServer.listen(yggConfig.port, () => {
      console.log(`Yggdrasil online on port ${yggConfig.port}`);
    });

    this.webServer.on("error", function (e) {
      console.log("unable to start webserver :/");
      console.log(e);
    });

    this.options = yggConfig;

    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (text) => {
      // @ts-ignore
      let server: YggdrasilServer = this;
      let content = text.toString().trim();

      try {
        let evaled = eval(content);
        console.log(evaled);
      } catch (err) {
        console.error("Eval error:" + err);
      }
    });

    console.log("started");
  }
}

const webApp = express();
const webServer = http.createServer(webApp);

const auth = new Authenticator(yggConfig.key);
export const server = new YggdrasilServer(webServer);

server.on("connection", (socket) => {
  console.log("connected");
  new socketManager(socket, server, auth);
});

server.on("message", (data: any) => {
  console.log(data);
});
