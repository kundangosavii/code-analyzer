import { run } from '../../index.js';
import fs from 'node:fs';
import { __dirname, __filename } from '../../config.js';
import path from 'path';

const analyzeController = (req, res) => {
    try {
        const TARGET_DIR = path.join(__dirname, "test-project");
        const registerPath = path.join(__dirname, "repos", "register.json");

        const date = new Date();
        const dateString = date.toLocaleString();

        const formattedDate = dateString.split(",")[1].trim();

        const generateUniqeId = () => {
            return TARGET_DIR.split(path.sep).pop() + "_" + formattedDate.replace(/[:\s]/g, "").replace('pm', "");
        }

        const repoPath = TARGET_DIR.split(path.sep).pop()
        if (fs.existsSync(`C:/code-analyser/repos/${repoPath}`)) {
            console.log("repo already analyzed")
            fs.readFile(registerPath, 'utf-8', (err, data) => {
                if (err) {
                    console.log("Error ocurred while reading the file")
                } else {
                    const jsonData = JSON.parse(data);
                    let UniqueId = null;
                    if (jsonData.repoName === repoPath) {
                        UniqueId = jsonData.UniqueId;
                    }

                    res.status(200).json({
                        message: 'Repository has already been analyzed.',
                        UniqueId
                    })
                }
            });

        }
        else {
            run()
            const UniqueId = generateUniqeId();
            const data = {
                repoName: path.basename(TARGET_DIR),
                UniqueId,
                date: formattedDate
            }
            fs.writeFile(registerPath, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.error("Error writing to register file:", err);
                } else {
                    console.log("Successfully wrote to register file.");
                }
            });
            res.status(200).json({
                message: 'Code analysis completed successfully.',
                UniqueId
            });
        }
    } catch (error) {
        console.error('Error during code analysis:', error);
        res.status(500).json({ message: 'An error occurred during code analysis.' });
    }
}

const getInsightsController = (req, res, repoId) => {
    try {
        const repoId = req.query.repoId;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        fs.readFile(`C:/code-analyser/repos/${repoName}/insights.json`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading insights file:', err);
                return res.status(500).json({ message: 'An error occurred while fetching insights.' });
            }
            const insights = JSON.parse(data);
            res.status(200).json(insights);
        });
    } catch (error) {
        console.error('Error fetching insights:', error);
        res.status(500).json({ message: 'An error occurred while fetching insights.' });
    }
}

export { analyzeController, getInsightsController }