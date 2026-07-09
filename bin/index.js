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
    .command('analyze')
    .argument('<repoPath>', 'Path to the repository or GitHub repository URL')
    .action(async (repoPath) => {
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

    });

program
    .command('detail-analysis')
    .argument('<repoPath>')
    .action(async (repoPath) => {
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


    })
program
    .command('dashboard')
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
    .action((path) => {
        const result = loadFiles(path);

        section("Complexity Analysis");

        const complexity = Object.entries(result.complexity).map(([file, data]) => ({
            fileName: data.file,
            complexityScore: data.complexityScore,
        }));
        console.log(chalk.bold.blue(`Found ${complexity.length} files`));
        console.table(complexity);
    })

program
    .command('cycles')
    .argument('<repoPath>')
    .action((repoPath) => {
        const result = loadFiles(repoPath);

        section("Cycle Detection");

        const cycles = result.cycle.map((cycle, index) => ({
            cycleNumber: index + 1,
            files: cycle.map((file) => path.basename(file)),
        }));

        console.log(chalk.bold.red(`Found ${cycles.length} cycles`));

        cycles.forEach((cycle) => {
            console.log(`Cycle ${cycle.cycleNumber}: ${cycle.files.join(' -> ')}`);
        });
    })

program
    .command('depth-table')
    .argument('<repoPath>')
    .action((path) => {
        const result = loadFiles(path);

        section("Depth Analysis");

        const table = new Table({
            head: ["File", "Score", "Depth", "In Cycle", "Imports", "Imported By"],
        });

        Object.entries(result.complexity).forEach(([fileName, data]) => {
            table.push([fileName, data.complexityScore, data.depth, data.inCycle ? "Yes" : "No", data.imports, data.importedBy]);
        });

        console.log(table.toString());
    })


program.parse(process.argv);