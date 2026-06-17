import { useState } from 'react'
import './App.css'

import { analyzeRepo, getInsights } from './api.js'

export default function App() {
  const [repoInput, setRepoInput] = useState("");
  const [repos, setRepos] = useState([
    { repoId: "repo_2", name: "test-repo" },
    { repoId: "test-project_32126", name:"test-project" }
  ]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [insights, setInsights] = useState([]);

  const handleAnalyze = () => {
    const repoInput = analyzeRepo()
    console.log("Analyze:", repoInput);
  };

  const  handleSelectRepo = async (repo) => {
    setSelectedRepo(repo);
    console.log(repo.repoId)
    const insights = await getInsights(repo.repoId)
    setInsights(insights)
    console.log("Insights:", insights)
  };

  return (
    <div className="h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Repositories</h2>

        {repos.map((repo) => (
          <div
            key={repo.repoId}
            onClick={() => handleSelectRepo(repo)}
            className={`p-2 mb-2 rounded cursor-pointer ${
              selectedRepo?.repoId === repo.repoId
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

        </div>
      </div>
    </div>
  );
}

