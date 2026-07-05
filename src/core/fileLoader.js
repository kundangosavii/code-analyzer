import fs from 'fs';
import path from 'path';

const SUPPORTED_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.json'];

const IGNORED_DIRS = ["node_modules", ".git", "dist", "build", ".next",".gitignore", "package-lock.json", "yarn.lock", "pnpm-lock.yaml", "package.json", "tsconfig.json", ".eslintrc.js", ".prettierrc", ".babelrc", ".env", ".env.local", ".env.development", ".env.test", ".env.production","docs", "test_project", "repos"];

export function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);

        if (IGNORED_DIRS.includes(file)) {
            return;
        }

        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, arrayOfFiles);
        } else {
            const ext = path.extname(file);
            if (SUPPORTED_EXTENSIONS.includes(ext)) {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
}