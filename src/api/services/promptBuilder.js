export function buildPrompt(analysisData){
    const{
        deadCode,
        cycles,
        complexity,
        impact
    } = analysisData;

    return `You are a senior software engineer reviewing a codebase.

Analyze the following system data:

Dead Code Files:
${deadCode?.join("\n") || "None"}

Circular Dependencies:
${cycles?.map(c => c.join(" → ")).join("\n") || "None"}

Top Complex Files:
${Object.keys(complexity)
  .map(f => `${f} (score: ${complexity[f].complexityScore})`)
  .join("\n") || "None"}

Impact Summary:
${impact?.slice(0, 5).map(i => i.file).join("\n") || "None"}

TASK:
1. Identify highest risk areas
2. Suggest refactoring order
3. Explain architecture issues
4. Give actionable improvements

Keep response short, structured, and practical.`
}