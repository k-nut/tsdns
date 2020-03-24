import {Answers} from "./Answers";

describe("Answers", () => {
  describe("fromBuffer", () => {
    const buffer = Buffer.from(
      "03777777056b2d6e7574026575000001000100000e100004b91a9c18",
      "hex"
    );

    it("correctly extracts name from answer", () => {
      // Act
      const answers = Answers.fromBuffer(buffer, 0);

      // Assert
      expect(answers.name).toBe("www.k-nut.eu");
     });

    it("correctly extracts IP for A-Name answer", () => {
      // Act
      const answers = Answers.fromBuffer(buffer, 0);

      // Assert
      expect(answers.rdata).toBe("185.26.156.24");
    });

    it("throws if a non A-Record answer is parsed", () => {
      // Arrange
      // This is a buffer that contains the CNAME response for
      // sunsets.k-nut.eu
      const cnameBuffer = Buffer.from(
        "0773756e73657473056b2d6e7574026575000005000100000e10001d0f73756e736574732d6f7665726c6170076e65746c69667903636f6d00",
        'hex'
      )

      // Act
      const getAnswers = () => Answers.fromBuffer(cnameBuffer, 0);

      // Assert
      expect(getAnswers).toThrowError('Cannot yet parse record type: 5')
    });
  });
});

