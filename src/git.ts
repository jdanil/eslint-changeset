import * as execa from "execa";

const execGit = async (args: string[]): Promise<string> => {
  const { stdout } = await execa("git", args);
  return stdout;
};

export const getChangedFiles = async (revision: string): Promise<string[]> =>
  (
    await execGit([
      "diff",
      "--diff-filter=ACMRTUB",
      "--name-only",
      "--relative",
      revision,
    ])
  )
    .split("\n")
    .filter(Boolean);

export const getRevision = async (branch?: string): Promise<string> =>
  (await execGit(["merge-base", "HEAD", branch ?? "master"])).trim();
