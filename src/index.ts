// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from "DangerDSL";
declare let danger: DangerDSLType;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export declare function markdown(message: string): void;

import { CLIEngine } from "eslint";

/**
 * Better eslint plugin for DangerJS
 */
export default function eslinter() {
  const filesToLint = danger.git.created_files.concat(danger.git.modified_files)
  const cli = new CLIEngine({ baseConfig: config })
  return Promise.all(filesToLint.map(f => lintFile(cli, config, f)))
}

async function lintFile(linter, config, path) {
  const contents = await danger.github.utils.fileContents(path)
  const report = linter.executeOnText(contents, path)

  report.results[0].messages.map(msg => {
    if (msg.fatal) {
      fail(`Fatal error linting ${path} with eslint.`)
      return
    }

    const fn = { 1: warn, 2: fail }[msg.severity]

    fn(`${path} line ${msg.line} – ${msg.message} (${msg.ruleId})`)
  })
}