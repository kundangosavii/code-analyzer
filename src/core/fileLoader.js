import fs from 'fs';
import path from 'path';

const SUPPORTED_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.json'];



export function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, arrayOfFiles);
        } else {
            const ext = path.extname(file);
            if(SUPPORTED_EXTENSIONS.includes(ext)) {
                arrayOfFiles.push(filePath);
            }
        }   
    });

    return arrayOfFiles;
}