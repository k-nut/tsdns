import Packet from "./Packet";
import { Questions } from "./Questions";
import { TYPE } from "./TYPE";
import { Header } from "./Header";

const udp = require("dgram");

// creating a client socket
const client = udp.createSocket("udp4");

const header = Header.create(101);
const questions = Questions.create({ type: TYPE.A, name: "www.k-nut.eu" });
const packet = new Packet(header, questions);

client.on("message", function(msg: Buffer) {
  const packet = Packet.fromBuffer(msg);
  console.log(packet.answers!.rdata);
  client.close();
});

client.send(packet.toBuffer(), 53, "1.1.1.1", function(error: Error | null) {
  if (error) {
    client.close();
  }
});
