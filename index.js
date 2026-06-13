import path from "path";
import { __dirname, __filename } from './config.js';

import { getAllFiles } from "./src/core/fileLoader.js";
import { parseFile } from "./src/core/fileParser.js";

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
}

run();