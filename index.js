import path from "path";
import { __dirname, __filename } from './config.js';

import { getAllFiles } from "./src/core/fileLoader.js";
import { parseFile } from "./src/core/fileParser.js";
import { graphBuilder } from "./src/core/graphBuilder.js";
import { generateInsight } from "./src/core/insightEngine.js";
import { generateReadableInsights } from "./src/core/outputEngine.js";

const TARGET_DIR = path.join(__dirname, "test-project");

function run() {
  console.log("Scanning files...\n");

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

}

run();