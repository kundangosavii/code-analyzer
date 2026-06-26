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

const TARGET_DIR = "C:\\web devolapment\\courseMart_project\\courseMart\\backend\\src";

const resolved = path.resolve(TARGET_DIR);

console.log("RAW:", TARGET_DIR);
console.log("RESOLVED:", resolved);
console.log("EXISTS:", fs.existsSync(resolved));

function run() {
  // const repoUrl = process.argv[2]

  // if(!repoUrl) {
  //   console.error("Please provide a repository URL as an argument.");
  // }


  // const repoPath = await cloneRepo(repoUrl);

  console.log("Scanning files...\n", TARGET_DIR);

  const files = getAllFiles(TARGET_DIR);

  console.log(`Found ${files.length} files\n`);

  const results = [];

  files.forEach((file) => {
    const parsed = parseFile(file);
    results.push(parsed);
  });

  console.log("Sample Output:\n");
  console.log(JSON.stringify(results.slice(0, 3), null, 2));

  const graph = graphBuilder(results);

  console.log("\nGraph Output:\n");
  console.log(JSON.stringify(Object.entries(graph).slice(0, 3), null, 2));

  const insights = generateInsight(graph);

  console.log("\nInsights:\n");
  console.log(JSON.stringify(insights, null, 2));

  const ReadableInsights = generateReadableInsights(insights);

  console.log("\nReadable Insights:\n");
  ReadableInsights.forEach((msg, i) => {
    console.log(`${i + 1}. ${msg}`);
  });

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

  console.log("\nUnique ID for this run:", generateUniqeId());
  console.log(formattedDate)

}

// run();
export { run }