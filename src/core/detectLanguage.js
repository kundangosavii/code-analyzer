import path from 'path';

export function detectLanguage(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
        case ".js":
        case ".jsx":
            return "javascript";

        case ".ts":
        case ".tsx":
            return "typescript";
    }
}
