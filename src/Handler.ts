import { Header } from "./Header";
import { Questions } from "./Questions";
import { TYPE } from "./TYPE";
import Packet from "./Packet";
import { Socket } from "dgram";

const udp = require("dgram");

class Handler {
  private client: Socket;

  constructor() {
    this.client = udp.createSocket("udp4");
    this.handleMessage = this.handleMessage.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  private handleMessage(message: Buffer) {
    const packet = Packet.fromBuffer(message);
    console.log(packet.answers!.rdata);
    this.client.close();
  }

  private handleSend(error: Error | null) {
    if (error) {
      this.client.close();
    }
  }

  send(type: keyof typeof TYPE, name: string) {
    const header = Header.create(101); // TODO: Create dynamic IP
    const questions = Questions.create({ type: TYPE[type], name });
    const packet = new Packet(header, questions);
    this.client.on("message", this.handleMessage);
    this.client.send(packet.toBuffer(), 53, "1.1.1.1", this.handleSend);
  }
}

export default Handler;
