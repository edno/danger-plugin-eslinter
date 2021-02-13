import eslinter from "./index";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any;

const mockFileContents = (contents: string) => {
    const asyncContents: Promise<string> = new Promise((resolve) => resolve(contents));
    return async (path: string): Promise<string> => asyncContents;
};

describe("eslinter()", () => {
    beforeEach(() => {
        global.warn = jest.fn();
        global.message = jest.fn();
        global.fail = jest.fn();
        global.markdown = jest.fn();
    });

    afterEach(() => {
        global.warn = undefined;
        global.message = undefined;
        global.fail = undefined;
        global.markdown = undefined;
    });

    it("no fail to be called if code pass eslint rules", async () => {
        global.danger = {
            github: {
                pr: { title: "Test" },
                utils: {
                    fileContents: mockFileContents(
                        `
var foo = 1 + 1;
console.log(foo);
`.trim()
                    ),
                },
            },
            git: { created_files: ["foo.js"], modified_files: [] },
        };

        await eslinter();

        expect(global.fail).not.toHaveBeenCalled();
    });
});
