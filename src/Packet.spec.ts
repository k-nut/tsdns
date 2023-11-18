import { Header } from "./Header";
import Packet from "./Packet";
import {describe, it} from "node:test";
import assert from "assert";

describe("Packet", () => {
  describe("fromBuffer", () => {
    const buffer = Buffer.from(
      "00808180000100010000000003777777056b2d6e7574026575000001000103777777056b2d6e7574026575000001000100000e100004b91a9c18",
      "hex"
    );
    it("deserializes header parts from buffer", () => {
      // Arrange
      // Act
      const packet = Packet.fromBuffer(buffer);

      // Assert
      assert.strictEqual(packet.header.id, 128);
    });

    it("deserializes questions QNAME part from buffer", () => {
      // Arrange
      // Act
      const packet = Packet.fromBuffer(buffer);

      // Assert
      assert.strictEqual(packet.questions.name.value, "www.k-nut.eu");
    });

    it("deserializes answer NAME part from buffer", () => {
      // Arrange
      // Act
      const packet = Packet.fromBuffer(buffer);

      // Assert
      assert.strictEqual(packet.answers!.name, "www.k-nut.eu");
    });

    it("handles compressed payloads", () => {
      // Arrange
      const compressedBuffer = Buffer.from(
        "00658180000100010000000003777777056b2d6e75740265750000010001c00c0001000100000e100004b91a9c18",
        "hex"
      );

      // Act
      const packet = Packet.fromBuffer(compressedBuffer);

      // Assert
      assert.strictEqual(packet.questions.name.value, "www.k-nut.eu");
      assert.strictEqual(packet.answers!.name, "www.k-nut.eu");
    });
  });
});
