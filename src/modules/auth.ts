import jwt, { verify, VerifyCallback } from "jsonwebtoken";
import { VerifyClientCallbackAsync, VerifyClientCallbackSync } from "ws";

export class Authenticator {
  public key: string;

  constructor(apiKey: string) {
    this.key = apiKey;
  }

  public verifyAuth(info: any, cb: any) {
    var token = info.req.headers.token;
    if (!token) {
      cb(false, 401, "Unauthorized");
      console.log("no token provided");
    } else {
      console.log(this.key + " ||||" + token);
      jwt.verify(token, this.key, (err: any, decoded: any) => {
        if (err) {
          cb(false, 401, "Unauthorized");
          console.log("wrong token provided");
        } else {
          info.req.user = decoded; //[1]
          cb(true);
          console.log("auth ok");
        }
      });
    }
  }
}
