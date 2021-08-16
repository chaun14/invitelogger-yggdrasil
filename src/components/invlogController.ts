import WebSocket from "ws";
import { controllerInfoData } from "../types";
import { YggdrasilServer } from "../yggdrasil";

export class InvlogController {
  server: YggdrasilServer;
  socket: WebSocket;

  infos: controllerInfoData;
  id: number;

  public constructor(server: YggdrasilServer, id: number, socket: WebSocket, infos: controllerInfoData) {
    console.log("controller " + id + " registered");
    this.server = server;
    this.socket = socket;
    this.id = id;
    this.infos = infos;
  }
}
