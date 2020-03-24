import { Header } from "./Header";
import Packet from "./Packet";

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
      expect(packet.header.id).toBe(128);
    });

    it("deserializes questions QNAME part from buffer", () => {
      // Arrange
      // Act
      const packet = Packet.fromBuffer(buffer);

      // Assert
      expect(packet.questions.name.value).toEqual("www.k-nut.eu");
    });

    it("deserializes answer NAME part from buffer", () => {
      // Arrange
      // Act
      const packet = Packet.fromBuffer(buffer);

      // Assert
      expect(packet.answers!.name).toEqual("www.k-nut.eu");
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
      expect(packet.questions.name.value).toEqual("www.k-nut.eu");
      expect(packet.answers!.name).toEqual("www.k-nut.eu");
    });
  });
});
