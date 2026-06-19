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
                let direct = [];
                let indirect = [];
                // imports = graphJson[file].imports;

                const [indirectImpacts, directImpacts] = getIndirectImpact(graphJson, file);



                // indirectImpacts.forEach(indirect => {
                //     if (!indirect.includes(indirect)) {
                        
                //     }
                // });
                // directImpacts.forEach(direct => {
                //     if (!direct.includes(direct)) {
                //         direct.push(direct);
                //     }
                // });

                console.log(directImpacts)
                console.log(indirectImpacts)

                const fileName = file.split('\\').pop();
                const directName = directImpacts.map(imp => imp.split('\\').pop());
                const indirectName = indirectImpacts.map(imp => imp.split('\\').pop());
                const Data = {
                    file: fileName,
                    direct: directName.join(', '),
                    indirect: indirectName.join(', ')
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