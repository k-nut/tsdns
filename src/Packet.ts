import { Header } from "./Header";
import { Questions } from "./Questions";
import { Answers } from "./Answers";

class Packet {
  header: Header;
  questions: Questions;
  answers?: Answers;

  constructor(header: Header, questions: Questions, answers?: Answers) {
    this.header = header;
    this.questions = questions;
    this.answers = answers;
  }

  static fromBuffer(buffer: Buffer): Packet {
    const header: Header = Header.fromBuffer(buffer);
    // the header is 12 byte long so cut those off for the questions
    const questions: Questions = Questions.fromBuffer(buffer, 12);
    // cut off the header and questions part
    const answers: Answers = Answers.fromBuffer(
      buffer,
      12 + questions.length / 8
    );

    return new Packet(header, questions, answers);
  }

  public toBuffer(): Buffer {
    return Buffer.concat([this.header.toBuffer(), this.questions.toBuffer()]);
  }
}
export default Packet;
