import * as mri from "mri";

import { eslintChangeset } from "./eslint-changeset";

export const cli = () => {
  // parse cli args
  const argv = process.argv.slice(2);
  const args = mri(argv);

  // run eslint-changeset
  eslintChangeset({
    branch: args["branch"],
    fix: args["fix"],
  });
};
