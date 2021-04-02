import { eslint } from "./eslint";
import { getChangedFiles, getRevision } from "./git";

export const eslintChangeset = async ({
  branch = "master",
  fix,
  since,
}: {
  branch?: string;
  fix?: boolean;
  since?: string;
}): Promise<void> => {
  // scm get files
  const revision = since ?? (await getRevision(branch)) ?? branch;
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
  const { errorCount, formattedResults } = await eslint(files, fix);
  console.log(formattedResults || "👌 No issues found.");

  // exit
  if (errorCount) {
    process.exit(1);
  }
};
