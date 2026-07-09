import path from "path";
import { __dirname, __filename } from './config.js';
import fs from "node:fs";

import { getAllFiles } from "./src/core/fileLoader.js";
import { parseFile } from "./src/core/fileParser.js";
import { graphBuilder } from "./src/core/graphBuilder.js";
import { generateInsight } from "./src/core/insightEngine.js";
import { generateReadableInsights } from "./src/core/outputEngine.js";
import { cloneRepo } from "./src/core/repoCloner.js";
import { saveGraph, saveInsights, saveReadableInsights, saveGraphInNodeAndEdgesFormat, saveCycle, saveComplexity } from "./src/core/saveInsights.js";
import { transformGraph } from "./src/core/graphTransformation.js";
import { impactAnalysis } from "./src/core/impactAnalysis.js";
import { detectCycles, calculateDepth, calculateComplexity } from "./src/core/dfsAnalysis.js";
import ora from "ora";



async function run(repoUrl) {
  const TARGET_DIR = repoUrl;
  const resolved = path.resolve(TARGET_DIR);

  let repoPath;

  if(repoUrl.includes("github.com")) {
    repoPath = await cloneRepo(TARGET_DIR);
  }
  else{
    repoPath = resolved;
  }


  const files = getAllFiles(repoPath)


  const results = [];

  files.forEach((file) => {
    const parsed = parseFile(file);
    results.push(parsed);
  });


  const graph = graphBuilder(results);

  const insights = generateInsight(graph);

  const ReadableInsights = generateReadableInsights(insights);

  const graphNodesEdges = transformGraph(graph)

  const cycle = detectCycles(graph)
  const depth = calculateDepth(graph)
  const complexity = calculateComplexity(graph, depth, cycle)

  saveGraph(TARGET_DIR, graph);
  saveInsights(TARGET_DIR, insights);
  saveReadableInsights(TARGET_DIR, ReadableInsights);
  saveGraphInNodeAndEdgesFormat(TARGET_DIR, graphNodesEdges);
  saveCycle(TARGET_DIR, cycle);
  saveComplexity(TARGET_DIR, complexity);

  impactAnalysis(TARGET_DIR);

  const date = new Date();
  const dateString = date.toLocaleString();

  const formattedDate = dateString.split(",")[1].trim();

  const generateUniqeId = () => {
    return TARGET_DIR.split(path.sep).pop() + "_" + formattedDate.replace(/[:\s]/g, "").replace('pm', "");
  }



  return {
    files,
    graph,
    insights,
    ReadableInsights,
    cycle,
    depth,
    complexity,
    graphNodesEdges
  };
}

export { run }