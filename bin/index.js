import { Command } from 'commander';
import chalk from 'chalk';
import path from 'path';
import { run } from '../index.js';
import { section } from './helper.js';
import ora from 'ora';


const program = new Command();

program
    .command('analyze')
    .argument('<repoPath>', 'Path to the repository or GitHub URL')
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

program.parse();