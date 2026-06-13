function generateInsight(graph){
    const insights = {
        "EntryPoints": [],
        "UnusedFiles": [],
        "HighlyCoupledFiles": [],
        "CentralFiles": []
    };

    for (let file in graph) {
        const node = graph[file];

        const importCount = node.imports.length;
        const importedByCount = node.importedBy.length;

        if (importedByCount === 0) {
            insights["EntryPoints"].push(
                {
                    file: file,
                    imports: node.imports,
                }
            );
        }

        if (importCount >= 3) {
            insights["HighlyCoupledFiles"].push(file);
        }

        if(importedByCount == 0 && importCount == 0 && !file.includes("app") && !file.includes("index")) {  
            insights["UnusedFiles"].push(file);
        }

        if(importedByCount >= 2) {
            insights["CentralFiles"].push(
                {
                    file: file,
                    usedBy: importedByCount,
                    importedBy: node.importedBy,
                }
            );
        }

    }

    return insights;

}

export {
    generateInsight
}