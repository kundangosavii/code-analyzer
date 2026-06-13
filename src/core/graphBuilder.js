import path from 'path';

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
    if (importPath.startsWith(".")) {
        return path.normalize(
            path.join(path.dirname(fromFile), importPath)
        );
    }

    return null
}

export {
    graphBuilder
}
