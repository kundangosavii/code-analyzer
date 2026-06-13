import path from 'path';
import fs from 'fs';

function graphBuilder(parsedFile) {
    const graph = {};

    parsedFile.forEach((fileData) => {
        graph[fileData.file] = {
            imports: [],
            importedBy: []
        }
    });

    parsedFile.forEach((fileData) => {
        const fromFile = fileData.file;
        console.log(fileData)

        fileData.imports.forEach((imp) => {
            console.log(imp)
            const resolvedPath = resolveImportPath(fromFile, imp);

            if (graph[resolvedPath]) {
                graph[fromFile].imports.push(resolvedPath);
                graph[resolvedPath].importedBy.push(fromFile);
            }
        })
    })

    return graph;

}

function resolveImportPath(fromFile, importPath) {
    if (!importPath.startsWith(".")) return null;

    let fullPath = path.join(path.dirname(fromFile), importPath);

    const possibleExtensions = [".js", ".ts", ".jsx", ".tsx"];

    for (let ext of possibleExtensions) {
        if (fs.existsSync(fullPath + ext)) {
            return path.normalize(fullPath + ext);
        }
    }

    if (fs.existsSync(fullPath)) {
        return path.normalize(fullPath);
    }

    return null
}

export {
    graphBuilder
}
