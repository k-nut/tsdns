import { Name } from "./Name";

describe("Name", () => {
  // this is `www.k-nut.eu`
  const buffer = Buffer.from("03777777056b2d6e757402657500", "hex");

  describe("parse", () => {
    it("extracts name from buffer", () => {
      // Arrange
      // Act
      const name = Name.parse(buffer);

      // Assert
      expect(name.value).toEqual("www.k-nut.eu");
    });
  });

  describe("toBuffer", () => {
    it("creates a buffer from domain name value", () => {
      // Arrange
      const name = new Name("www.k-nut.eu");

      // Act
      const buffer = name.toBuffer();

      // Assert
      expect(buffer).toEqual(buffer);
    });
  });

  describe("length", () => {
    // www . k-nut . eu
    // 3    5        2
    // three parts: 3 length bytes
    // plus one zero byte at the end
    // (3 + 5 + 2 + 3 + 1) === 14

    it("computes the correct length from a buffer", () => {
      // Arrange
      // Act
      const name = Name.parse(buffer);

      // Assert
      expect(name.length).toBe(14 * 8);
    });

    it("calculates length from value", () => {
      // Arrange
      const name = new Name("www.k-nut.eu");

      // Act
      const length = name.length;

      // Assert
      expect(length).toEqual(14 * 8);
    });
  });
});
