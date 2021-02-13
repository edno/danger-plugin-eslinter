// dangerfile.js
import { schedule } from "danger";

import yarn from "danger-plugin-yarn";
import jest from "danger-plugin-jest";

schedule(async () => {
  yarn();
  jest();
});
