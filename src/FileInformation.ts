
interface FileNameHash {
    [key: string] : FileInformation;
}

export class FileInformation {
    private static FileList: FileNameHash = {};
    fileName: string;

    constructor(filename: string) {
        this.fileName = filename;
    }

    public static getFileInformationForFilename(filename): FileInformation {
        let v = FileInformation.FileList[filename];
        if (v) {
            return v as FileInformation;
        }

        v = new FileInformation(filename);
        return v;
    }

}
