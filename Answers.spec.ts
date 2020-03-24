import {Answers} from "./Answers";

describe("Answers", () => {
  describe("fromBuffer", () => {
    const buffer = Buffer.from(
      "03777777056b2d6e7574026575000001000100000e100004b91a9c18",
      "hex"
    );

    it("correctly extracts name from answer", () => {
      // Act
      const answers = Answers.fromBuffer(buffer);

      // Assert
      expect(answers.name).toBe("www.k-nut.eu");
     });

    it("correctly extracts IP for A-Name answer", () => {
      // Act
      const answers = Answers.fromBuffer(buffer);

      // Assert
      expect(answers.rdata).toBe("185.26.156.24");
    });
  });
});

