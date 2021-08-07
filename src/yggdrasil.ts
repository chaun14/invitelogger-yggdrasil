import { Server } from "ws";
import config from "../config.json";
export class YggdrasilClient extends Server {
  public constructor(port: number) {
    super({ port: port });
  }
}

let client = new YggdrasilClient(config.port);

client.on("listening", (data: any) => {
  console.log("socket ready on port " + client.options.port);
});
