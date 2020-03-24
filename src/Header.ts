import bitwise from "bitwise";
import { Bit } from "bitwise/types";

// https://www2.cs.duke.edu/courses/fall16/compsci356/DNS/DNS-primer.pdf
// https://tools.ietf.org/html/rfc1035
// HEADER section
/*
                                1  1  1  1  1  1
      0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                      ID                       |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |QR|   Opcode  |AA|TC|RD|RA|   Z    |   RCODE   |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    QDCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ANCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    NSCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
    |                    ARCOUNT                    |
    +--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+--+
 */

export class Header {
  constructor({
    id,
    qr,
    opcode,
    aa,
    tc,
    rd,
    ra,
    z,
    rcode,
    qdcount,
    ancount,
    nscount,
    arcount
  }: {
    id: number;
    qr: boolean;
    opcode: number;
    aa: boolean;
    tc: boolean;
    rd: boolean;
    ra: boolean;
    z: number;
    rcode: number;
    qdcount: number;
    ancount: number;
    nscount: number;
    arcount: number;
  }) {
    this.id = id;
    this.qr = qr;
    this.opcode = opcode;
    this.aa = aa;
    this.tc = tc;
    this.rd = rd;
    this.ra = ra;
    this.z = z;
    this.rcode = rcode;
    this.qdcount = qdcount;
    this.ancount = ancount;
    this.nscount = nscount;
    this.arcount = arcount;
  }
  id: number;
  qr: boolean;
  opcode: number;
  aa: boolean;
  tc: boolean;
  rd: boolean;
  ra: boolean;
  z: number;
  rcode: number;
  qdcount: number;
  ancount: number;
  nscount: number;
  arcount: number;

  static fromBuffer(buffer: Buffer) {
    return new Header({
      id: bitwise.buffer.readUInt(buffer, 0, 16),
      qr: bitwise.buffer.readUInt(buffer, 16, 1) === 1,
      opcode: bitwise.buffer.readUInt(buffer, 17, 4),
      aa: bitwise.buffer.readUInt(buffer, 21, 1) === 1,
      tc: bitwise.buffer.readUInt(buffer, 22, 1) === 1,
      rd: bitwise.buffer.readUInt(buffer, 23, 1) === 1,
      ra: bitwise.buffer.readUInt(buffer, 24, 1) === 1,
      z: bitwise.buffer.readUInt(buffer, 25, 3),
      rcode: bitwise.buffer.readUInt(buffer, 28, 4),
      qdcount: bitwise.buffer.readUInt(buffer, 32, 16),
      ancount: bitwise.buffer.readUInt(buffer, 48, 16),
      nscount: bitwise.buffer.readUInt(buffer, 64, 16),
      arcount: bitwise.buffer.readUInt(buffer, 80, 16)
    });
  }

  public toString() {
    return JSON.stringify({
      id: this.id,
      qr: this.qr,
      opcode: this.opcode,
      aa: this.aa,
      tc: this.tc,
      rd: this.rd,
      ra: this.ra,
      z: this.z,
      rcode: this.rcode,
      qdcount: this.qdcount,
      ancount: this.ancount,
      nscount: this.nscount,
      arcoun: this.arcount
    });
  }

  public toBuffer(): Buffer {
    // header
    const id: any = Buffer.alloc(2);
    id[1] = this.id;
    const QR: Bit[] = this.qr ? [1] : [0];
    const OPCODE: Bit[] = [0, 0, 0, 0]; // standard query
    const AA: Bit[] = [0]; // authoritative answer
    const TC: Bit[] = [0]; // truncation
    const RD: Bit[] = [1]; // recursion desired
    const RA: Bit[] = [0]; // recursion available
    const Z: Bit[] = [0, 0, 0]; // reserved field
    const RCODE: Bit[] = [0, 0, 0, 0]; // response code
    const type = bitwise.buffer.create([
      ...QR,
      ...OPCODE,
      ...AA,
      ...TC,
      ...RD,
      ...RA,
      ...Z,
      ...RCODE
    ]);
    const QDCOUNT = Buffer.alloc(2);
    QDCOUNT[1] = 1; // we have one question
    const ANCOUNT = Buffer.alloc(2);
    const NSCOUNT = Buffer.alloc(2);
    const ARCOUNT = Buffer.alloc(2);
    return Buffer.concat([id, type, QDCOUNT, ANCOUNT, NSCOUNT, ARCOUNT]);
  }

  public static create(id: number) : Header {
    return new Header({
      aa: false,
      ancount: 0,
      arcount: 0,
      id,
      nscount: 0,
      opcode: 0,
      qdcount: 0,
      qr: false,
      ra: false,
      rcode: 0,
      rd: false,
      tc: false,
      z: 0
    })
  }
}
