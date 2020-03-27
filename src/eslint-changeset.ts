import { CLIEngine } from "eslint";

import { getChangedFiles, getRevision } from "./git";

export const eslintChangeset = async ({
  branch,
  fix,
  since,
}: {
  branch?: string;
  fix?: boolean;
  since?: string;
}) => {
  // scm get files
  const revision = since ?? (await getRevision(branch));
  console.log(`🔍 Finding files changed since ${revision}.`);
  const files = await getChangedFiles(revision);
  if (files.length) {
    console.log(`📄 Linting ${files.length} files...`);
    files.forEach((file) => {
      console.log(`- ${file}`);
    });
  } else {
    console.log("No files were found 🤷");
    process.exit(0);
  }

  // eslint execute
  const cli = new CLIEngine({ fix });
  const { errorCount, results } = cli.executeOnFiles(files);
  const formatter = cli.getFormatter();
  console.log(
    formatter(CLIEngine.getErrorResults(results)) || "👌 No issues found.",
  );

  // exit
  if (errorCount) {
    process.exit(1);
  }
};
