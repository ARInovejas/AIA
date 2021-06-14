import { Router } from 'express';

// Usage is <Name> from <Relative Path to router of entity
import teacher from './entities/TeacherCRUD/router';
import itemanalysis from './entities/ItemAnalysisCRUD/router';
import foe from './entities/FrequencyOfErrorCRUD/router';
import rawscore from './entities/RawScoreCRUD/router';


const router = Router();

// Add another router.use to include functionality

router.use('/teacher', teacher);
router.use('/itemanalysis', itemanalysis);
router.use('/foe', foe);
router.use('/rawscore', rawscore);


export default router;
