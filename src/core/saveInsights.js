import fs from 'node:fs'
import path from 'path'
import { __dirname, __filename } from '../../config.js';


function saveInsights(TARGET_DIR, graph, a, b) {
    const basePath = __dirname

    const newRepo = path.join(basePath, 'repos')
    console.log(newRepo)

    try {
        const repoPath = path.join(newRepo, path.basename(TARGET_DIR))
        const fullRepoPath = path.join(repoPath, 'result.json')

        fs.mkdir(repoPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating directory:', err);
            } else {
                console.log('Directory created successfully!');
            }});
        fs.writeFile(fullRepoPath, JSON.stringify(graph, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log('Results saved successfully!');
            }
        });
        } catch (error) {
            console.error('Error saving results:', error);
        }


        // try {
        //     const filePath = path.join(NewRepo, 'ReadableInsights.txt')
        //      ReadableInsights.forEach((msg, i) => {
        //         fs.writeFile(filePath, `ReadableInsights_${i + 1}.txt`, msg);
        //     })
        // }catch(error){
        //     console.error('Error saving readable insights:', error)
        // }

    }

export { saveInsights }