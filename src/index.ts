import { program } from "commander";

import Handler from "./Handler";
import { TYPE } from "./TYPE";

const handler = new Handler();

program
  .version("0.0.1")
  .arguments("<type> <name>")
  .action((type: keyof typeof TYPE, name: string) => {
    handler.send(type, name);
  });

program.parse(process.argv);
