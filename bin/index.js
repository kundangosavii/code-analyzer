import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import { spawn } from "child_process";
import waitOn from "wait-on";
import open from "open";
import ora from 'ora';
import Table from "cli-table3"

import { run } from '../index.js';
import { section } from './helper.js';
import { loadFiles } from './loadFiles.js';


const program = new Command();

program
    .name('code-analyser')
    .description('Analyze your codebase for risks and dependencies')
    .version('1.0.0');

program
    .command('analyze')
    .argument('<repoPath>', 'Path to the repository or GitHub repository URL')
    .description('Analyze the codebase and provide insights of the codebase')
    .option('--json', 'Output results in JSON format')
    .addHelpText(
        "after",
        `
Examples:
  code-analyzer analyze ./project
  code-analyzer cycles ./project --top 3
  code-analyzer complexity ./project --json
`
    )
    .action(async (repoPath, options) => {
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        const spinner = ora('Analyzing repository...').start();

        const startTime = Date.now();

        spinner.text = "Analyzing...";
        await delay(1000);

        spinner.text = "Still analyzing...";
        await delay(1000);

        spinner.text = "Almost done...";
        const result = await run(repoPath);

        const elapsed = Date.now() - startTime;
        const remaining = 3000 - elapsed;

        if (remaining > 0) {
            await new Promise(resolve => setTimeout(resolve, remaining));
        }

        spinner.succeed(chalk.green("Analysis Complete"));
        console.log(chalk.bold.blue(`Found ${result.files.length} files for analysis.\n`));

        if (options.json) {
            console.log(`Total Files: ${JSON.stringify(result.graphNodesEdges.nodes.length, null, 2)}`);
            console.log(`Entry Points: ${JSON.stringify(result.insights.EntryPoints.map(ep => path.basename(ep.file)), null, 2)}`);
            console.log(`Cycles Found: ${JSON.stringify(result.cycle.length, null, 2)}`);
            console.log(`Dead Code Files: ${JSON.stringify(result.insights.UnusedFiles.length, null, 2)}`);

            const highRiskFiles = Object.entries(result.complexity).filter(([, data]) => data.inCycle == true);
            highRiskFiles.forEach(([file, data]) => {
                console.log(`\nFile: ${path.basename(file)}, \n Depth: ${data.depth},\n In Cycle: ${data.inCycle}`);
            });

            console.log(`\nHigh Complexity Files: ${highRiskFiles.length}`);

        } else {
            section("Codebase Summary");

            console.log(`Total Files: ${result.graphNodesEdges.nodes.length}`);
            console.log(`Entry Points: ${result.insights.EntryPoints.map(ep => path.basename(ep.file)).join(', ')}`);
            console.log(`Cycles Found: ${result.cycle.length}`);
            console.log(`Dead Code Files: ${result.insights.UnusedFiles.length}`);

            section("High Risk Files");
            const highRiskFiles = Object.entries(result.complexity).filter(([, data]) => data.inCycle == true);
            highRiskFiles.forEach(([file, data]) => {
                console.log(`\nFile: ${path.basename(file)}, \n Depth: ${data.depth},\n In Cycle: ${data.inCycle}`);
            });

            console.log(`\nHigh Complexity Files: ${highRiskFiles.length}`);

        }
    });

program
    .command('detail-analysis')
    .argument('<repoPath>')
    .description('Provide a detailed analysis of the codebase including complexity, cycles, and dead code')
    .option('--json', 'Output results in JSON format')
        .addHelpText(
        "after",
        `
Examples:
  code-analyzer analyze ./project
  code-analyzer cycles ./project --top 3
  code-analyzer complexity ./project --json
`
    )
    .action(async (repoPath, options) => {
        const delay = (ms) => new Promise(res => setTimeout(res, ms));
        const spinner = ora('Analyzing repository...').start();

        const startTime = Date.now();

        spinner.text = "Analyzing...";
        await delay(1000);

        spinner.text = "Still analyzing...";
        await delay(1000);

        spinner.text = "Almost done...";
        const result = await run(repoPath);

        const elapsed = Date.now() - startTime;
        const remaining = 3000 - elapsed;

        if (remaining > 0) {
            await new Promise(resolve => setTimeout(resolve, remaining));
        }

        spinner.succeed(chalk.green("Analysis Complete"));
        console.log(chalk.bold.blue(`Found ${result.files.length} files for analysis.\n`));

        if (options.json) {
            console.log(JSON.stringify(result, null, 2));

        } else {
            section("Codebase Summary");

            console.log(`Total Files: ${result.graphNodesEdges.nodes.length}`);
            console.log(`Entry Points: ${result.insights.EntryPoints.map(ep => path.basename(ep.file)).join(', ')}`);
            console.log(`Cycles Found: ${result.cycle.length}`);
            console.log(`Dead Code Files: ${result.insights.UnusedFiles.length}`);

            section("High Risk Files");
            const highRiskFiles = Object.entries(result.complexity).filter(([, data]) => data.inCycle == true);
            highRiskFiles.forEach(([file, data]) => {
                console.log(`\nFile: ${path.basename(file)}, \n Depth: ${data.depth},\n In Cycle: ${data.inCycle}`);
            });

            console.log(`\nHigh Complexity Files: ${highRiskFiles.length}`);

            section("Cycles Detected")
            console.log(`Total Cycles Detected: ${result.cycle.length}`);
            console.log(`Cycles: ${result.cycle.map(c => c.map(f => path.basename(f)).join(' -> ')).join('\n')}`);

            section("Depth Analysis");

            const table = new Table({
                head: ["File", "Score", "Depth", "In Cycle", "Imports", "Imported By"],
            });

            Object.entries(result.complexity).forEach(([fileName, data]) => {
                table.push([fileName, data.complexityScore, data.depth, data.inCycle ? "Yes" : "No", data.imports, data.importedBy]);
            });

            console.log(table.toString());
        }



    })

program
    .command('dashboard')
    .description('Start the interactive dashboard for visualizing and analyzing the codebase')
    .addHelpText(
        "after",
        `
Examples:
  code-analyzer analyze ./project
  code-analyzer cycles ./project --top 3
  code-analyzer complexity ./project --json
`
    )
    .action(async () => {
        section("Starting the Dashboard");
        const backendPath = "C:\\code-analyser";
        const frontendPath = "C:\\code-analyser\\src\\dashboard";

        console.log(chalk.blue("Starting the dashboard..."));

        const startProcess = (command, args, cwd, label) => {
            const child = spawn(command, args, {
                cwd,
                stdio: "inherit",
                shell: true
            });

            child.on("error", (err) => {
                console.error(`${label} failed to start:`, err.message);
            });

            return child;
        };

        const backend = startProcess("npm", ["run", "dev"], backendPath, "Backend");
        const frontend = startProcess("npm", ["run", "dev"], frontendPath, "Frontend");

        try {
            console.log(chalk.blue("Waiting for the dashboard to be ready..."));
            await waitOn({ resources: ["http://localhost:5173"], timeout: 30000 });

            console.log(chalk.green("Dashboard is ready! Opening in browser..."));
            await open("http://localhost:5173");
        } catch (err) {
            console.error(chalk.red("Error while starting the dashboard:"), err);
        }

        const cleanup = () => {
            backend.kill();
            frontend.kill();
            process.exit();
        };

        process.on("SIGINT", cleanup);
        process.on("SIGTERM", cleanup);
    });

program
    .command('complexity')
    .argument('<repoPath>')
    .description('Analyze the complexity of the codebase and provide a summary of complexity scores for each file')
    .option('--json', 'Output results in JSON format')
    .addHelpText(
        "after",
        `
Examples:
  code-analyzer analyze ./project
  code-analyzer cycles ./project --top 3
  code-analyzer complexity ./project --json
`
    )
    .action((path, options) => {
        const result = loadFiles(path);

        section("Complexity Analysis");

        const complexity = Object.entries(result.complexity).map(([file, data]) => ({
            fileName: data.file,
            complexityScore: data.complexityScore,
        }));
        console.log(chalk.bold.blue(`Found ${complexity.length} files`));
        if (options.json) {
            console.log(JSON.stringify(complexity, null, 2));
        } else {
            console.table(complexity);
        }
    })

program
    .command('cycles')
    .argument('<repoPath>')
    .description('Detect cycles in the codebase')
    .option('--json', 'Output results in JSON format')
    .addHelpText(
        "after",
        `
Examples:
  code-analyzer cycles ./project --top 3
`
    )
    .action((repoPath, options) => {
        const result = loadFiles(repoPath);

        section("Cycle Detection");

        const cycles = result.cycle.map((cycle, index) => ({
            cycleNumber: index + 1,
            files: cycle.map((file) => path.basename(file)),
        }));

        console.log(chalk.bold.red(`Found ${cycles.length} cycles`));

        if (options.json) {
            console.log(JSON.stringify(result.cycle, null, 2));
        } else {
            cycles.forEach((cycle) => {
                console.log(`Cycle ${cycle.cycleNumber}: ${cycle.files.join(' -> ')}`);
            });
        }
    });

program
    .command('depth-table')
    .argument('<repoPath>')
    .description('Generate a depth analysis table for the codebase')
    .addHelpText(
        "after",
        `
Examples:
    code-analyzer depth-table ./project
`
    )
    .option('--json', 'Output results in JSON format')
    .action((path, options) => {
        const result = loadFiles(path);

        section("Depth Analysis");

        if (options.json) {
            console.log(JSON.stringify(result.complexity, null, 2));
        } else {
            const table = new Table({
                head: ["File", "Score", "Depth", "In Cycle", "Imports", "Imported By"],
            });

            Object.entries(result.complexity).forEach(([fileName, data]) => {
                table.push([fileName, data.complexityScore, data.depth, data.inCycle ? "Yes" : "No", data.imports, data.importedBy]);
            });
            console.log(table.toString());
        }

    })


program.parse(process.argv);