import bitwise from "bitwise";
import { UInt8 } from "bitwise/types";

export class Name {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  private static getLength(buffer: Buffer, offset: number) {
    return bitwise.buffer.readUInt(buffer, offset * 8, 8);
  }

  get length(): number {
    const bytes = this.value.split(".").reduce((sum, part) => {
      return sum + part.length + 1;
    }, 1);

    return bytes * 8;
  }

  static parse(buffer: Buffer): Name {
    let currentLength = Name.getLength(buffer, 0);
    let totalLength = 0; // bytes
    const parts: string[] = [];
    while (currentLength !== 0) {
      currentLength = Name.getLength(buffer, totalLength);
      totalLength = totalLength + 1; // add the length octet
      parts.push(
        buffer.slice(totalLength, currentLength + totalLength).toString("ascii")
      );
      totalLength = totalLength + currentLength; // add the count of bytes
    }
    return new Name(
      parts.slice(0, parts.length - 1).join(".") // the array will end with an empty string. Remove it
    );
  }

  toBuffer(): Buffer {
    const parts = this.value.split(".");
    const buffers = parts.reduce(
      (collected, part) => {
        return [
          ...collected,
          bitwise.buffer.create(bitwise.byte.read(part.length as UInt8)),
          Buffer.from(part)
        ];
      },
      [] as Buffer[]
    );
    return Buffer.concat([
      ...buffers,
      bitwise.buffer.create(bitwise.byte.read(0))
    ]);
  }
}
