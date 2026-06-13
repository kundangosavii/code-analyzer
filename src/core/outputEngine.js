function generateReadableInsights(insights){
    const messages = []

    insights.EntryPoints.forEach((obj) => {
        messages.push(`Start from "${obj.file}" — likely an entry point.`);
    });

    insights.UnusedFiles.forEach((obj) => {
        messages.push(`File "${obj}" is not imported anywhere — consider removing it.`);
    });

    insights.HighlyCoupledFiles.forEach((obj) => {
        messages.push(`File "${obj}" has many dependencies — consider refactoring.`);
    });

    insights.CentralFiles.forEach((obj) => {
        messages.push(`File "${obj.file}" is heavily used — ensure it's well-maintained.`);
    });

    return messages; 
}

export {
    generateReadableInsights
}