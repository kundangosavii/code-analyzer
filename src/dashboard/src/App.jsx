import { useState } from 'react'
import './App.css'

import { analyzeRepo, getInsights, getGraph, getImpact, getDeadCode, getComplexity, getAIInsights } from './api.js'
import Graph from "./components/Graph.jsx";
import Insights from "./components/Markdown.jsx"

export default function App() {
  const [repoInput, setRepoInput] = useState("");
  const [repos, setRepos] = useState([
    { repoId: "repo_2", name: "test-repo" },
    { repoId: "test-project_32126", name: "test-project" },
    { repoId: "src_113849", name: "src"}
  ]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [insights, setInsights] = useState([]);
  const [graphData, setGraphData] = useState(null)
  const [cleanedInsights, setCleanedInsights] = useState(null)

  const [impact, setImpact] = useState([]);
  const [deadCode, setDeadCode] = useState([])
  const [complexity, setComplexity] = useState(null)

  const handleAnalyze = () => {
    console.log(repoInput)
    analyzeRepo(repoInput)
  };

  const handleSelectRepo = async (repo) => {
    setSelectedRepo(repo);
    console.log(repo.repoId)
    const insights = await getInsights(repo.repoId)
    setInsights(insights)
    console.log("Insights:", insights)

    const graphData = await getGraph(repo.repoId)
    setGraphData(graphData)
    console.log("Insights:", graphData)

  };

  const handleNodeClick = async (filePath) => {
    try {
      const repo = selectedRepo
      const impact = await getImpact(repo.repoId, filePath);
      setImpact(impact);
      const complexity = await getComplexity(repo.repoId, filePath)
      setComplexity(complexity)
      console.log(complexity)
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeadCode = async () => {
    try {
      const repo = selectedRepo
      const deadCode = await getDeadCode(repo.repoId)
      setDeadCode(deadCode)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAiInsights = async () => {
    try{
      const repo = selectedRepo
      const aiinsights = await getAIInsights(repo.repoId)
      setCleanedInsights(aiinsights.insights)
    } catch (err){
      console.log(err)
    }
  }

  return (
    <div className="h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Repositories</h2>

        {repos.map((repo) => (
          <div
            key={repo.repoId}
            onClick={() => handleSelectRepo(repo)}
            className={`p-2 mb-2 rounded cursor-pointer ${selectedRepo?.repoId === repo.repoId
              ? "bg-blue-100"
              : "hover:bg-gray-100"
              }`}
          >
            {repo.name}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col">

        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Code Analyzer Dashboard</h1>
          <div className="flex gap-2">
            <input
              type="text"
              value={repoInput}
              onChange={(e) => setRepoInput(e.target.value)}
              placeholder="Enter GitHub repo URL or local path"
              className="flex-1 border mt-10 p-2 rounded"
            />
            <button
              onClick={handleAnalyze}
              className="bg-blue-500 text-white mt-10 px-4 py-2 rounded hover:bg-blue-600"
            >
              Analyze
            </button>
          </div>
        </div>

        {/* Insights Section */}
        <div className="flex-1 bg-white rounded p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Insights</h2>

          {!selectedRepo && (
            <p className="text-gray-500">Select a repository to view insights</p>
          )}

          {selectedRepo && insights.length === 0 && (
            <p className="text-gray-400">No insights loaded</p>
          )}

          {insights.map((item, index) => (
            <div
              key={index}
              className="p-3 mb-2 border rounded bg-gray-50"
            >
              {item}
            </div>
          ))}

          <h2 className="text-lg font-semibold mb-3 mt-5">Graph Visualization</h2>

          <Graph graphData={graphData} onNodeClick={handleNodeClick} />

          {impact && impact.length > 0 && impact.map((item, index) => {
            return (
              <div key={index} className='p-3 border mb-2 mt-5'>
                <h1 className='text-red-600 font-bold text-2xl underline'>Impact Analysis</h1>

                <p className='mt-5'><strong>Direct:</strong></p>
                <div>{item.direct}</div>

                <p className='mt-5'><strong>Indirect:</strong></p>
                <div>{item.indirect}</div>

                <p className='mt-5'><strong>Total Impacted Files:  </strong>{item.totalImpactedFiles}</p>
              </div>
            );
          })}

          { complexity && (
            <div className='p-3 border mb-2 mt-5'>
                <h1 className='text-red-600 font-bold text-2xl underline'>Complexity Analysis</h1>

                <p className='mt-5'><strong>File:</strong></p>
                <div>{complexity.file}</div>

                <p className='mt-3'><strong>imports:</strong></p>
                <div>{complexity.imports}</div>

                <p className='mt-3'><strong>importedBy:</strong></p>
                <div>{complexity.importedBy}</div>

                <p className='mt-3'><strong>depth:</strong></p>
                <div>{complexity.depth}</div>

                <p className='mt-3'><strong>inCycle:</strong></p>
                <div>{String(complexity.inCycle)}</div>

                <p className='mt-3'><strong>Total complexity score of file:  </strong>{complexity.complexityScore}</p>
              </div>

          )}

             

          <div>
            <button
              onClick={handleDeadCode}
              className="bg-blue-500 text-white mt-10 px-4 py-2 rounded hover:bg-blue-600"
            >
              Dead Code
            </button>

            {deadCode && deadCode.map((item, index) => {
              return (
                <div key={index} className='p-3 border mb-2 mt-5'>
                  <h1 className='text-red-600 font-bold text-2xl underline'>Dead Code Files</h1>

                  <div>{item}</div>
                </div>
              )
            })}
          </div>

          <div>
            <button
              onClick={handleAiInsights}
              className="bg-red-600 text-white mt-10 px-4 py-2 rounded hover:bg-blue-600"
            >
              Get AI Insights
            </button>

            <Insights content={cleanedInsights} />
          </div>


        </div>
      </div>
    </div>
  );
}

