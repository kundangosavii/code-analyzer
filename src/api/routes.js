import { Router } from 'express'
import { analyzeController, getInsightsController } from './controller.js'

const router = Router()

router.get('/analyze', analyzeController);
router.get('/insights', getInsightsController);
router.get('/readable-insights', getReadableInsightsController);
router.get('/graph', getGraphController);

export default router;