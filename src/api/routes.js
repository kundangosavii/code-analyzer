import { Router } from 'express'
import { 
    analyzeController, 
    getInsightsController,
    getReadableInsightsController,
    getGraphController,
    getGraphWithNodeAndEdgeController,
    getImpactAnalysisController,
    getDeadCodeController,
    getComplexityController,
    getAIInsightsController
} from './controller.js'

const router = Router()

router.get('/analyze', analyzeController);
router.get('/insights', getInsightsController);
router.get('/readable-insights', getReadableInsightsController);
router.get('/graph', getGraphController);
router.get('/graphNodesEdges', getGraphWithNodeAndEdgeController);
router.get('/impact-analysis', getImpactAnalysisController)
router.get('/dead-code', getDeadCodeController)
router.get('/complexity', getComplexityController)
router.get('/ai-insights', getAIInsightsController)

export default router;