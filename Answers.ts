import { Name } from "./Name";
import bitwise from "bitwise";

export class Answers {
  name: string;
  type: number;
  klass: number;
  ttl: number;
  rdlength: number;
  rdata: string;

  constructor({
    name,
    type,
    klass,
    ttl,
    rdlength,
    rdata
  }: {
    name: string;
    type: number;
    klass: number;
    ttl: number;
    rdlength: number;
    rdata: string;
  }) {
    this.name = name;
    this.type = type;
    this.klass = klass;
    this.ttl = ttl;
    this.rdlength = rdlength;
    this.rdata = rdata;
  }

  static getType(buffer: Buffer, offset: number): number {
    return bitwise.buffer.readUInt(buffer, offset, 16);
  }

  static getClass(buffer: Buffer, offset: number): number {
    return bitwise.buffer.readUInt(buffer, offset, 16);
  }

  private static parseARecords(buffer: Buffer): string {
    return [
      bitwise.buffer.readUInt(buffer, 0, 8),
      bitwise.buffer.readUInt(buffer, 8, 8),
      bitwise.buffer.readUInt(buffer, 16, 8),
      bitwise.buffer.readUInt(buffer, 24, 8),
    ].join('.')
  }

  static getData(buffer: Buffer, type: number): string {
    switch (type) {
      case 1: // A-Record
        return Answers.parseARecords(buffer)
      default:
        throw Error(`Cannot yet parse record type: ${type}`)
    }
  }

  static fromBuffer(buffer: Buffer): Answers {
    const name = Name.parse(buffer);
    const offset = name.length;
    const type = Answers.getType(buffer, offset);
    const klass = Answers.getClass(buffer, offset + 16);
    const ttl = bitwise.buffer.readUInt(buffer, offset + 32, 32);
    const rdlength = bitwise.buffer.readUInt(buffer, offset + 64, 16);
    const rdata = Answers.getData(buffer.slice((offset + 80) / 8), type);
    return new Answers({
      klass,
      rdata,
      rdlength,
      ttl,
      name: name.value,
      type
    });
  }
}
