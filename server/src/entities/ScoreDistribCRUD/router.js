import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post('/view-score-distrib', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewScoreDistrib(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed scores',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing scores';
        break;
      case 404:
        message = 'Score not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.post('/view-all-score-distrib', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewAllScoreDistrib(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed all scores',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing all scores';
        break;
      case 404:
        message = 'All scores not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post(
  '/edit-score-distrib',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.editScoreDistrib(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited score.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while editing score.';
          break;
        case 404:
          message = 'Cannot edit score.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);




export default router;
