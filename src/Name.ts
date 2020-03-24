import bitwise from "bitwise";
import { Bit, UInt8 } from "bitwise/types";

export class Name {
  value: string;
  isPointer: boolean = false;

  constructor(value: string) {
    this.value = value;
  }

  private static getLength(
    buffer: Buffer,
    offset: number
  ): { type: "abs" | "rel"; value: number } {
    const bits = bitwise.buffer.read(buffer, offset * 8, 16);
    if (bits[0] == 1 && bits[1] == 1) {
      // compression is used! 😱
      const tampered: Bit[] = [0, 0, ...bits.slice(2)];
      return {
        type: "abs",
        value: bitwise.buffer.readUInt(bitwise.buffer.create(tampered), 0, 16),
      };
    }
    return {
      type: "rel",
      value: bitwise.buffer.readUInt(buffer, offset * 8, 8)
    };
  }

  get length(): number {
    if (this.isPointer){
      return 16;
    }
    const bytes = this.value.split(".").reduce((sum, part) => {
      return sum + part.length + 1;
    }, 1);

    return bytes * 8;
  }

  private static readAt(buffer: Buffer, start: number, length: number) {
    return buffer.slice(start, start + length).toString("ascii");
  }

  static parse(buffer: Buffer, initialOffset: number): Name {
    let totalLength = initialOffset; // bytes
    let length = Name.getLength(buffer, totalLength);
    if (length.type === 'abs'){
      const name = Name.parse(buffer, length.value)
      name.isPointer = true;
      return name;
    }
    const parts: string[] = [];
    while (length.value !== 0) {
      length = Name.getLength(buffer, totalLength);
      totalLength = totalLength + 1; // add the length octet
      parts.push(Name.readAt(buffer, totalLength, length.value));
      totalLength = totalLength + length.value; // add the count of bytes
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
