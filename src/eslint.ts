// @ts-expect-error
import { CLIEngine, ESLint } from "eslint";

const asyncFilter = async (
  arr: unknown[],
  predicate: (value: unknown) => unknown,
) =>
  arr.reduce(
    async (memo, e) =>
      (await predicate(e)) ? [...(await (memo as unknown[])), e] : memo,
    [],
  );

const eslint6 = (files: string[], fix?: boolean) => {
  const cli = new CLIEngine({ fix });
  const { errorCount, results } = cli.executeOnFiles(files);
  const formatter = cli.getFormatter();
  const formattedResults = formatter(CLIEngine.getErrorResults(results));

  return { errorCount, formattedResults };
};

const eslint7 = async (files: string[], fix?: boolean) => {
  const cli = new ESLint({ fix });
  const filteredFiles = await asyncFilter(
    files,
    async (file) => !(await cli.isPathIgnored(file)),
  );
  const results = await cli.lintFiles(filteredFiles);
  const formatter = await cli.loadFormatter();
  const formattedResults = formatter.format(results);

  return { errorCount: results.errorCount, formattedResults };
};

export const eslint = async (files: string[], fix?: boolean) =>
  ESLint ? await eslint7(files, fix) : eslint6(files, fix);
