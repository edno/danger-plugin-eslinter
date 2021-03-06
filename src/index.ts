// Provides dev-time type structures for  `danger` - doesn't affect runtime.
import {DangerDSLType} from "../node_modules/danger/distribution/dsl/DangerDSL";
declare let danger: DangerDSLType;
export declare function message(message: string): void
export declare function warn(message: string): void
export declare function fail(message: string): void
export declare function markdown(message: string): void

/**
 * Better eslint plugin for DangerJS
 */
export default function eslinter() {
    // Replace this with the code from your Dangerfile
    const title = danger.github.pr.title;
    message(`PR Title: ${title}`);
}
