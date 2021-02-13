// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from "danger";
declare let danger: DangerDSLType;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export declare function markdown(message: string): void;

import { ESLint } from "eslint";
import {diffJson} from "diff";

/**
 * Better eslint plugin for DangerJS
 */
export default async function eslinter(options?: ESLint.Options, ref?: string): Promise<any> {
  const [createdFiles, modifiedFiles]: string[][] = await Promise.all([danger?.git?.created_files, danger?.git?.modified_files]);
  const linter: ESLint = new ESLint(options);
  return Promise.all([...createdFiles, ...modifiedFiles].map((file) => lintFile(linter, file, ref)));
}

async function lintFile(linter: ESLint, filePath: string, ref?: string): Promise<any> {
  const code: string = await danger?.github?.utils?.fileContents(filePath, null, ref);
  const [result]: ESLint.LintResult[] = await linter?.lintText(code || "", { filePath });
  return result;
  // return result?.messages?.map((msg) => {
  //   if (msg.fatal) {
  //     fail(`Fatal error linting ${filePath} with eslint.`);
  //     return;
  //   }

  //   const fn = { 1: warn, 2: fail }[msg.severity];

  //   fn(`${filePath} line ${msg.line} – ${msg.message} (${msg.ruleId})`);
  // });
}

export async function warnDiff(): Promise<any> {
  // using get diff instead?
  const base = await danger.git.base;
  const [lintRef, lintHead] = await Promise.all([eslinter({}, "main"), eslinter()]);

  const result = diffJson(lintRef, lintHead);
  console.log(base);
  console.log(JSON.stringify(lintRef));
  console.log(JSON.stringify(lintHead));
  return result;
}
