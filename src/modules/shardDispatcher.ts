import { Socket } from "socket.io";
import { InvlogController } from "../components/invlogController";
import { InvlogShard } from "../components/invlogShard";
import { YggdrasilServer } from "../yggdrasil";
import { Authenticator } from "./auth";
import config from "../../config.json";

export class shardDispatcher {
  server: YggdrasilServer;
  unlinkedShards: Set<number>;

  public constructor(server: YggdrasilServer) {
    this.server = server;

    // build our shard list
    let unlinkedShards: Set<number> = new Set();
    for (let i = 0; i < config.shards.inviteLogger; i++) {
      unlinkedShards.add(i);
    }
    this.unlinkedShards = unlinkedShards;

    console.log("Loading shardDispatcher");
  }

  public async checkSockets() {
    for (let [id, controller] of this.server.invlogControllers) {
      for (let shardId of controller.shards) {
        if (this.unlinkedShards.has(shardId)) this.unlinkedShards.delete(shardId);
      }
    }
  }
}
