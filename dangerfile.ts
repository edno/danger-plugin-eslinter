// dangerfile.ts
import { schedule } from "danger";

import yarn from "danger-plugin-yarn";
import jest from "danger-plugin-jest";
import eslinter from "./src";

schedule(async () => {
  yarn();
  eslinter();
  jest();
});
