import * as mri from "mri";

import { eslintChangeset } from "./eslint-changeset";

export const cli = async () => {
  // parse cli args
  const argv = process.argv.slice(2);
  const args = mri(argv);

  // run eslint-changeset
  await eslintChangeset({
    branch: args["branch"] as string,
    fix: args["fix"] as boolean,
  });
};
