import { Router } from 'express';

// Usage is <Name> from <Relative Path to router of entity
import teacher from './entities/TeacherCRUD/router';
import itemanalysis from './entities/ItemAnalysisCRUD/router';
import item from './entities/ItemCRUD/router';
import scoreDistrib from './entities/ScoreDistribCRUD/router';

const router = Router();

// Add another router.use to include functionality

router.use('/teacher', teacher);
router.use('/itemanalysis', itemanalysis);
router.use('/item', item);
router.use('/scoreDistrib', scoreDistrib);

export default router;
