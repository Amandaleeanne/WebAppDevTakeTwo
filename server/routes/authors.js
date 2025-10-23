const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authorController');

router.get('/', ctrl.list);
router.get('/:id', ctrl.show);
router.post('/', ctrl.create);

module.exports = router;
