import fs from 'fs';
import path from '@babel/parser';

function parseFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const ast = path.parse(fileContent, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
    });

    const result = {
        file: filePath,
        function : [],
        imports: [],
    }

    traverseAST(ast, result);

    return result;
}

function traverseAST(node, result) {
    if (!node || typeof node != 'object') return;

    // Detect imports

    if (node.type === 'ImportDeclaration') {
        result.imports.push(node.source.value);
    }

    // Detect function declarations

    if (node.type === 'FunctionDeclaration' || node.type === 'ArrowFunctionExpression') {
        result.function.push(node.id ? node.id.name : 'anonymous');
    }

    // traverse child nodes

    for(let key in node) {
        if(node[key] && typeof node[key] === 'object') {
            traverseAST(node[key], result);
        }
}

}

export { parseFile };