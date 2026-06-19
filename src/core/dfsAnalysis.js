function getIndirectImpact(graphJson, startfile) {
    const visited = new Set();
    const indirect = new Set();

    function dfs(file) {
        const dependents = graphJson[file]?.importedBy || [];

        for(const dep of dependents) {
            if(!visited.has(dep)) {
                visited.add(dep);
                indirect.add(dep);
                dfs(dep);
            }
        }
    }

    dfs(startfile);
    return Array.from(indirect);
}

export { getIndirectImpact }