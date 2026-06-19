import path from 'path';
import fs from 'fs';
import { __dirname, __filename } from '../../config.js';

import { getIndirectImpact } from './dfsAnalysis.js';


const newRepo = path.join(__dirname, 'repos')

function impactAnalysis(TARGET_DIR) {

    const repoPath = path.join(newRepo, path.basename(TARGET_DIR))
    const fullRepoPath = path.join(repoPath, 'graph.json')

    fs.readFile(fullRepoPath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${fullRepoPath}:`, err);
            return;
        }

        let impactData = [];

        try {
            const graphJson = JSON.parse(data);
            for (const file in graphJson) {
                let imports = [];
                let importedBy = [];
                imports = graphJson[file].imports;

                const indirectImpacts = getIndirectImpact(graphJson, file);
                indirectImpacts.forEach(indirect => {
                    if (!importedBy.includes(indirect)) {
                        importedBy.push(indirect);
                    }
                });

                const fileName = file.split('\\').pop();
                const importsName = imports.map(imp => imp.split('\\').pop());
                const Data = {
                    file: fileName,
                    imports: importsName.join(', '),
                    importedBy: importedBy
                };

                impactData.push(Data);
            }
            fs.writeFile(path.join(repoPath, 'impactAnalysis.json'), JSON.stringify(impactData, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error(`Error writing impact analysis to file:`, writeErr);
                    } else {
                        console.log(`Impact analysis saved to ${path.join(repoPath, 'impactAnalysis.json')}`);
                    }
                });
        }
        catch (parseErr) {
            console.error(`Error parsing JSON from file ${fullRepoPath}:`, parseErr);
        }
    }
    )


}

export { impactAnalysis }