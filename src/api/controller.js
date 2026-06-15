import { run } from '../../index.js';
import fs from 'node:fs';

const analyzeController = (req, res) => {
    try {
        const date = new Date();
        const dateString = date.toLocaleString();

        const formattedDate = dateString.split(",")[1].trim();

        const generateUniqeId = () => {
            return TARGET_DIR.split(path.sep).pop() + "_" + formattedDate.replace(/[:\s]/g, "").replace('pm', "");
        }


        const UniqueId = generateUniqeId();

        run();
        res.status(200).json({
            message: 'Code analysis completed successfully.',
            UniqueId
        });
    } catch (error) {
        console.error('Error during code analysis:', error);
        res.status(500).json({ message: 'An error occurred during code analysis.' });
    }
}

const getInsightsController = (req, res) => {
    try {

        fs.readFile(`C:/code-analyser/repos/test-project/insights.json`, 'utf-8', (err, data) => {
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