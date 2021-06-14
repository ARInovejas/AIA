import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();


router.post('/view-all-rawscore', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewAllRawScore(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed rawscore',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing RawScore';
        break;
      case 404:
        message = 'RawScore not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post(
  '/edit-rawscore',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.editRawScore(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited RawScore.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while editing RawScore.';
          break;
        case 404:
          message = 'Cannot edit RawScore.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);



export default router;
