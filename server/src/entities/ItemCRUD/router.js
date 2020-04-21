import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.post('/view-item', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewItem(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed item',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing item';
        break;
      case 404:
        message = 'Item not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.post('/view-all-item', async (req, res) => {
  console.log('Request');
  try {
    const data = await Ctrl.viewAllItem(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully viewed all items',
      data: data
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 500:
        message = 'Internal server error while viewing all items';
        break;
      case 404:
        message = 'All items not found';
        break;
    }
    res.status(status).json({ status, message });
  }
});


router.post(
  '/edit-item',
  async (req, res) => {
    console.log('Request');

    try {
      const data = await Ctrl.editItem(req.body);
      res.status(200).json({
        status: 200,
        message: 'Successfully edited item.'
      });
    } catch (status) {
      let message = '';
      switch (status) {
        case 500:
          message = 'Internal server error while editing item.';
          break;
        case 404:
          message = 'Cannot edit item.';
          break;
      }
      res.status(status).json({ status, message });
    }
  }
);




export default router;
