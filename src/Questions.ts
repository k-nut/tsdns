import {Name} from "./Name";
import bitwise from "bitwise";
import {TYPE} from "./TYPE";

// QUESTION
/*

                                    1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                                               |
    /                     QNAME                     /
    /                                               /
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     QTYPE                     |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                     QCLASS                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+

 */
export class Questions {
  qtype: TYPE;
  qclass: number;
  name: Name;

  constructor({
    name,
    qtype,
    qclass,
  }: {
    name: Name;
    qtype: TYPE;
    qclass: number;
  }) {
    this.name = name;
    this.qtype = qtype;
    this.qclass = qclass;
  }

  getTypeString(): string {
    const map = {
      1: "A",
      2: "NS"
    };
    // @ts-ignore
    return map[this.qtype];
  }

  get length(): number {
    return this.name.length + 2 * 16;
  }

  static getType(buffer: Buffer, offset: number): number {
    return bitwise.buffer.readUInt(buffer, offset, 16);
  }

  static getClass(buffer: Buffer, offset: number): number {
    return bitwise.buffer.readUInt(buffer, offset, 16);
  }

  static fromBuffer(buffer: Buffer, initialOffset: number): Questions {
    const name = Name.parse(buffer, initialOffset);
    buffer = buffer.slice(initialOffset);
    const offset = name.length;
    const type = Questions.getType(buffer, offset);
    const qclass = Questions.getClass(buffer, offset + 16);
    return new Questions({
      qtype: type,
      name,
      qclass,
    });
  }

  public static create({
    type,
    name
  }: {
    type: TYPE;
    name: string;
  }): Questions {
    return new Questions({
      qclass: 1, // internet
      name: new Name(name),
      qtype: type
    });
  }

  public toBuffer(): Buffer {
    const QNAME = this.name.toBuffer();

    const QTYPE = Buffer.alloc(2);
    QTYPE[1] = this.qtype;

    const QCLASS = Buffer.alloc(2);
    QCLASS[1] = 1; // class is always 00 01 (INTERNET)

    return Buffer.concat([QNAME, QTYPE, QCLASS]);
  }
}
