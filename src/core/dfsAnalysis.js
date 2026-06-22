import path from "path";

function getIndirectImpact(graphJson, startfile) {
    const visited = new Set();
    const indirect = new Set();

    function dfs(file) {
        const dependents = graphJson[file]?.importedBy || [];

        for (const dep of dependents) {
            if (!visited.has(dep)) {
                visited.add(dep);
                indirect.add(dep);
                dfs(dep);
            }
        }
    }

    visited.add(startfile); // prevent self-loop
    dfs(startfile);

    const direct = graphJson[startfile]?.importedBy || [];

    const indirects = Array.from(indirect).filter(
        file => !direct.includes(file)
    );

    return [indirects, direct];
}

function detectCycles(graph) {
  const visited = new Set();
  const recStack = new Set();
  const cycles = [];

  function dfs(node, path) {
    if (recStack.has(node)) {
      // cycle found
      const cycleStartIndex = path.indexOf(node);
      const cycle = path.slice(cycleStartIndex);
      cycles.push([...cycle, node]); // close loop
      return;
    }

    if (visited.has(node)) return;

    visited.add(node);
    recStack.add(node);

    const neighbors = graph[node]?.imports || [];

    for (const neighbor of neighbors) {
      dfs(neighbor, [...path, node]);
    }

    recStack.delete(node);
  }

  for (const node in graph) {
    if (!visited.has(node)) {
      dfs(node, []);
    }
  }

  return cycles;
}

function calculateDepth(graph) {
  const memo = {};
  const visiting = new Set();

  function dfs(node) {
    if (memo[node] !== undefined) return memo[node];

    if (visiting.has(node)) {
      return 0; 
    }

    visiting.add(node);

    const dependents = graph[node]?.importedBy || [];

    let maxDepth = 0;

    for (const dep of dependents) {
      maxDepth = Math.max(maxDepth, dfs(dep));
    }

    visiting.delete(node);

    memo[node] = dependents.length === 0 ? 0 : 1 + maxDepth;

    return memo[node];
  }

  const result = {};

  for (const node in graph) {
    result[node] = dfs(node);
  }

  return result;
}

function calculateComplexity(graph, depthMap, cycles) {
    const cycleSet = new Set(cycles.flat());

    const complexityScores = {};

    for(const node in graph) {
        const imports = graph[node]?.imports.length || 0;
        const importedBy = graph[node]?.importedBy.length || 0;
        const depth = depthMap[node] || 0;
        const inCycle = cycleSet.has(node);

        const score = (imports * 1) + (importedBy * 2) + (depth * 3) + (inCycle ? 5 : 0);

        const file = node.split(path.sep).slice(-1)[0]; 

        complexityScores[file] = {
            file: file,
            imports,
            importedBy,
            depth,
            inCycle,
            complexityScore: score
        };
    }

    return complexityScores;
}

export { getIndirectImpact, detectCycles, calculateDepth, calculateComplexity };