import { Header } from "./Header";

describe("header", () => {
  describe("fromBuffer", () => {
    it("deserializes buffer", () => {
      // Arrange
      const buffer = Buffer.from(
        "00808180000100010000000003777777056b2d6e7574026575000001000103777777056b2d6e7574026575000001000100000e100004b91a9c18",
        "hex"
      );

      // Act
      const header = Header.fromBuffer(buffer);

      // Assert
      expect(header.id).toBe(128);
    });
  });
});
