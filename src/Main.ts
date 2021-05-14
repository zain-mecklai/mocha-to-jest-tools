import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import {FileInformation} from "./FileInformation";
import {MockImportToFileInfoHash} from "./MockImportToFileInfoHash";
import mock = jest.mock;

let rootDir: string;
let mockImports: MockImportToFileInfoHash = {};
let keys: string[] = [];

function parseArgs() {
    console.log(process.argv);
    if (process.argv.length < 3) {
        rootDir = process.cwd();
    } else {
        rootDir = process.argv[2];
    }
}

parseArgs();
console.log(`rootDir is ${rootDir}`);

glob(`${rootDir}/**/*.spec.ts`, function (er, files) {
    files.forEach((filename, index) => {
        console.log(`${filename} : ${index}`);
        const currentFile: FileInformation = FileInformation.getFileInformationForFilename(filename);
        let contents: string = fs.readFileSync(filename,'utf8');
        let splitContents: string[] = contents.split('\n');
        splitContents.forEach((line, lineNumber) => {

            let match: RegExpMatchArray = /from\s+'(\S+__mocks__\S+)'/.exec(line);
            if (match) {
                // console.log(`${lineNumber}: ${line}`);
                let importedclass: string = match[1];
                // console.log(`Imported class is ${importedclass}`);
                let filesThatImportThisMock = mockImports[importedclass];
                if (filesThatImportThisMock)
                {
                    (filesThatImportThisMock as FileInformation[]).push(currentFile);
                } else {
                    mockImports[importedclass] = [currentFile];
                    keys.push(importedclass);
                }
            }
        });
    });
    // console.log(keys);
    // console.log(mockImports);
    keys.forEach((key, index) => {
        let file_list: FileInformation[] = mockImports[key];
        console.log(`${key} ${file_list.length}`);
    })
});