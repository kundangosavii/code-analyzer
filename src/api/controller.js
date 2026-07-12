import { run } from '../../index.js';
import fs from 'node:fs';
import { __dirname, __filename } from '../../config.js';
import path from 'path';

import { llmService } from './services/llmService.js';

const analyzeController = (req, res) => {
    try {
        const repoUrl = req.body.repoUrl;
        console.log("Received repoUrl:", repoUrl);
        const TARGET_DIR = repoUrl;
        const registerPath = path.join(__dirname, "repos", "register.json");

        const date = new Date();
        const dateString = date.toLocaleString();

        const formattedDate = dateString.split(",")[1].trim();

        const generateUniqeId = () => {
            if (TARGET_DIR.includes(".git")) {
                return TARGET_DIR.split('/').pop().replace('.git', '') + "_" + formattedDate.replace(/[:\s]/g, "").replace('pm', "");
            } else {
                return TARGET_DIR.split(path.sep).pop() + "_" + formattedDate.replace(/[:\s]/g, "").replace('pm', "");
            }
        }

        let repoPath;

        if (TARGET_DIR.includes(".git")) {
            repoPath = TARGET_DIR.split('/').pop().replace('.git', '');
        }
        else {
            repoPath = TARGET_DIR.split(path.sep).pop();
        }

        console.log("repoPath:", repoPath);

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
            run(repoUrl)
            const UniqueId = generateUniqeId();
            let repoName;
            if (path.basename(TARGET_DIR).includes(".git")) {
                repoName = path.basename(TARGET_DIR).replace('.git', '');
            }
            else {
                repoName = path.basename(TARGET_DIR);
            }
            const newObj = {
                repoName: repoName,
                UniqueId,
                date: formattedDate,
                analyzedAt: new Date().toISOString()
            }

            let data = [];
            if (fs.existsSync(registerPath)) {
                const content = fs.readFileSync(registerPath, "utf-8");
                data = content ? JSON.parse(content) : [];
            }

            data.push(newObj)

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

const getAnalysisTimingController = (req, res, repoId) => {
    try {
        const repoId = req.query.repoId;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        fs.readFile(`C:/code-analyser/repos/register.json`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading register file:', err);
                return res.status(500).json({ message: 'An error occurred while fetching analysis timing.' });
            }

            const registerData = JSON.parse(data);
            const repoData = registerData.find(item => item.UniqueId === repoId);

            if (!repoData) {
                return res.status(404).json({ message: 'Repository not found in register.' });
            }

            res.status(200).json({
                analyzedAt: repoData.analyzedAt
            });
        });

    }
    catch {
        console.error('Error fetching analysis timing:', error);
        res.status(500).json({ message: 'An error occurred while fetching analysis timing.' });
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

const getReadableInsightsController = (req, res, repoId) => {
    try {
        const repoId = req.query.repoId;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        fs.readFile(`C:/code-analyser/repos/${repoName}/readableInsights.txt`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading Readable insights file:', err);
                return res.status(500).json({ message: 'An error occurred while fetching readable insights.' });
            }
            const ReadableInsights = data.split('\n')
            res.status(200).json(ReadableInsights);
        });
    }
    catch (error) {
        console.error('Error fetching readable insights:', error);
        res.status(500).json({ message: 'An error occurred while fetching readable insights.' });
    }
}

const getGraphController = (req, res, repoId) => {
    try {
        const repoId = req.query.repoId;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        fs.readFile(`C:/code-analyser/repos/${repoName}/graph.json`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading Graph file:', err);
                return res.status(500).json({ message: 'An error occurred while fetching graph data.' });
            }

            const graph = JSON.parse(data);
            res.status(200).json(graph);
        });
    }
    catch (error) {
        console.error('Error fetching graph data:', error);
        res.status(500).json({ message: 'An error occurred while fetching graph data.' });
    }
}

const getGraphWithNodeAndEdgeController = (req, res, repoId) => {
    try {
        const repoId = req.query.repoId;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        fs.readFile(`C:/code-analyser/repos/${repoName}/graphNodesEdges.json`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading Graph file:', err);
                return res.status(500).json({ message: 'An error occurred while fetching graph data.' });
            }

            const graphNodeEdges = JSON.parse(data);
            res.status(200).json(graphNodeEdges);
        });
    }
    catch (error) {
        console.error('Error fetching graph data:', error);
        res.status(500).json({ message: 'An error occurred while fetching graph data.' });
    }
}

const getImpactAnalysisController = (req, res) => {
    try {
        const { repoId, file } = req.query;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        fs.readFile(`C:/code-analyser/repos/${repoName}/impactAnalysis.json`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading Impact Analysis file:', err);
                return res.status(500).json({ message: 'An error occurred while fetching impact analysis data.' });
            }

            const fileName = path.normalize(file);
            const impctAnalysis = JSON.parse(data);
            const result = impctAnalysis.filter(item => path.normalize(item.file) === fileName);
            res.status(200).json(result);
        });
    }
    catch (error) {
        console.error('Error fetching impact analysis data:', error);
        res.status(500).json({ message: 'An error occurred while fetching impact analysis data.' });
    }
}

const getDeadCodeController = (req, res) => {
    try {
        const { repoId, file } = req.query;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        fs.readFile(`C:/code-analyser/repos/${repoName}/insights.json`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading Dead Code file:', err);
                return res.status(500).json({ message: 'An error occurred while fetching dead code data.' });
            }

            const insights = JSON.parse(data);
            const deadcode = insights.UnusedFiles

            res.status(200).json(deadcode);
        });
    }
    catch (error) {
        console.error('Error fetching dead code data:', error);
        res.status(500).json({ message: 'An error occurred while fetching dead code data.' });
    }
}

const getCycleController = (req, res) => {
}

const getComplexityController = (req, res) => {
    try {
        const { repoId, file } = req.query;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        fs.readFile(`C:/code-analyser/repos/${repoName}/complexity.json`, 'utf-8', (err, data) => {
            if (err) {
                console.error('Error reading Complexity file:', err);
                return res.status(500).json({ message: 'An error occurred while fetching complexity data.' });
            }

            const fileName = file.split(path.sep).slice(-1)[0];
            const complexity = JSON.parse(data);
            const result = complexity[fileName];
            res.status(200).json(result);
        });
    }
    catch (error) {
        console.error('Error fetching complexity data:', error);
        res.status(500).json({ message: 'An error occurred while fetching complexity data.' });
    }
}

const getAIInsightsController = async (req, res) => {
    try {

        const repoId = req.query.repoId;

        const repoName = repoId.split("_").slice(0, -1).join("_");

        if (fs.existsSync(`C:/code-analyser/repos/${repoName}/aiInsights.json`)) {
            const insightsContent = fs.readFileSync(`C:/code-analyser/repos/${repoName}/aiInsights.json`, 'utf8');
            const insightsData = JSON.parse(insightsContent);

            return res.status(200).json({
                success: true,
                insights: insightsData
            });
        }
        else {
            const insightsContent = fs.readFileSync(`C:/code-analyser/repos/${repoName}/insights.json`, 'utf8');
            const insightsData = JSON.parse(insightsContent);
            const deadcode = insightsData.UnusedFiles


            const cyclesContent = fs.readFileSync(`C:/code-analyser/repos/${repoName}/cycle.json`, 'utf8');
            const cycles = JSON.parse(cyclesContent);

            const complexityContent = fs.readFileSync(`C:/code-analyser/repos/${repoName}/complexity.json`, 'utf8');
            const complexity = JSON.parse(complexityContent);

            const impactContent = fs.readFileSync(`C:/code-analyser/repos/${repoName}/impactAnalysis.json`, 'utf8');
            const impact = JSON.parse(impactContent);

            const analysisData = {
                deadcode,
                cycles,
                complexity,
                impact
            };

            const data = await llmService(analysisData);

            fs.writeFileSync(`C:/code-analyser/repos/${repoName}/aiInsights.json`, JSON.stringify(data, null, 2), 'utf8');


            res.status(200).json({
                success: true,
                insights: data
            })
        }

    } catch (error) {
        console.error('Error fetching AI insights:', error);
        res.status(500).json({ message: 'An error occurred while fetching AI insights.' });
    }
};

const getReposController = (req, res) => {
    try {
        const registerPath = path.join(__dirname, "repos", "register.json");

        if (fs.existsSync(registerPath)) {
            const content = fs.readFileSync(registerPath, "utf-8");
            const data = content ? JSON.parse(content) : [];

            res.status(200).json(
                data.map(r => ({
                    repoId: r.UniqueId,
                    name: r.repoName
                }))
            );
        } else {
            res.status(404).json({ message: 'Register file not found.' });
        }
    } catch (error) {
        console.error('Error fetching Repos:', error);
        res.status(500).json({ message: 'An error occurred while fetching Repos.' });
    }
}
export {
    analyzeController,
    getInsightsController,
    getReadableInsightsController,
    getGraphController,
    getGraphWithNodeAndEdgeController,
    getImpactAnalysisController,
    getDeadCodeController,
    getComplexityController,
    getAIInsightsController,
    getReposController,
    getAnalysisTimingController
}