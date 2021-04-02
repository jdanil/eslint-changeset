import * as execa from "execa";

const execGit = async (args: string[]): Promise<string> => {
  const { stdout } = await execa("git", args);
  return stdout;
};

const getChangedFilesByDiff = async (revision: string): Promise<string[]> =>
  (
    await execGit(
      [
        "diff",
        "--diff-filter=ACMRTUB",
        "--name-only",
        "--relative",
        revision,
      ].filter(Boolean),
    )
  )
    .split("\n")
    .filter(Boolean);

const getChangedFilesByLog = async (branch: string): Promise<string[]> =>
  (await execGit(["log", "--name-only", "--pretty=format:", `${branch}..HEAD`]))
    .split("\n")
    .filter(Boolean);

export const getChangedFiles = async (revision: string): Promise<string[]> => {
  try {
    return await getChangedFilesByDiff(revision);
  } catch {
    return await getChangedFilesByLog(revision);
  }
};

export const getRevision = async (branch: string): Promise<string> => {
  try {
    return (await execGit(["merge-base", "HEAD", branch])).trim();
  } catch {
    return null;
  }
};
