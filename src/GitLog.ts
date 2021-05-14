import * as child_process from 'child_process';

export class GitLog {
    public commit: string;
    public date: string;

    public static Parse() {
        child_process.exec('git log --date=iso', (err, stdout, stderr) => {
            let splitContents: string[] = stdout.split('\n');
            splitContents.forEach((line, lineNumber) => {
                // console.log(line);
                let commitMatch: RegExpMatchArray = /commit (\S+)/.exec(line);
                let dateMatch: RegExpMatchArray = /Date:\s+(.*)/.exec(line);
                // console.log(commitMatch);
                // console.log(dateMatch);
                if (dateMatch) {
                    let d = Date.parse(dateMatch[1]);
                    console.log(`${d} ${dateMatch[1]}`);
                }
            });
        });
    }
}
