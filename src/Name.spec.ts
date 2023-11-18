import { Name } from "./Name";
import {describe, it} from "node:test";
import assert from "assert";

describe("Name", () => {
  // this is `www.k-nut.eu`
  const buffer = Buffer.from("03777777056b2d6e757402657500", "hex");

  describe("parse", () => {
    it("extracts name from buffer", () => {
      // Arrange
      // Act
      const name = Name.parse(buffer, 0);

      // Assert
      assert.strictEqual(name.value, "www.k-nut.eu");
    });
  });

  describe("toBuffer", () => {
    it("creates a buffer from domain name value", () => {
      // Arrange
      const name = new Name("www.k-nut.eu");

      // Act
      const buffer = name.toBuffer();

      // Assert
      assert.strictEqual(buffer, buffer);
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
      const name = Name.parse(buffer, 0);

      // Assert
      assert.strictEqual(name.length, 14 * 8);
    });

    it("calculates length from value", () => {
      // Arrange
      const name = new Name("www.k-nut.eu");

      // Act
      const length = name.length;

      // Assert
      assert.strictEqual(length, 14 * 8);
    });
  });
});
