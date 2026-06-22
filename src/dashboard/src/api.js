const Base_URL = '/api';

async function handleRespone(response) {
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData.error || 'An error occurred');
    }
    return response.json();
}

// Analyze a repository 

export async function analyzeRepo() {
    const response = await fetch(`${Base_URL}/analyze`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return handleRespone(response);
}

export async function getInsights(repoId) {
  const res = await fetch(`${Base_URL}/readable-insights?repoId=${repoId}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return handleRespone(res);
}

export async function getGraph(repoId) {
  const res = await fetch(`${Base_URL}/graphNodesEdges?repoId=${repoId}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
  });
  return handleRespone(res);
}

export async function getImpact(repoId, filePath) {
    const res = await fetch(`${Base_URL}/impact-analysis?repoId=${repoId}&file=${filePath}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return handleRespone(res);
}