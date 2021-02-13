// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import { DangerDSLType } from "danger";
declare let danger: DangerDSLType;
export declare function message(message: string): void;
export declare function warn(message: string): void;
export declare function fail(message: string): void;
export declare function markdown(message: string): void;

import { ESLint } from "eslint";

/**
 * Better eslint plugin for DangerJS
 */
export default async function eslinter(options?: ESLint.Options): Promise<any> {
    const filesToLint: string[] = await danger.git.created_files.concat(danger.git.modified_files);
    const linter: ESLint = new ESLint(options);
    return Promise.all(filesToLint.map((file) => lintFile(linter, file)));
}

async function lintFile(linter: ESLint, filePath: string): Promise<any> {
    const code: string = await danger?.github?.utils?.fileContents(filePath);
    const [result]: ESLint.LintResult[] = await linter?.lintText(code || "", { filePath });

    return result?.messages?.map((msg) => {
        if (msg.fatal) {
            fail(`Fatal error linting ${filePath} with eslint.`);
            return;
        }

        const fn = { 1: warn, 2: fail }[msg.severity];

        fn(`${filePath} line ${msg.line} – ${msg.message} (${msg.ruleId})`);
    });
}
