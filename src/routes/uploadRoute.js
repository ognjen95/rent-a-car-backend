const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const { fileValidation } = require('../middleware/fileValidation');

router.post('/', upload.single('imgUrl'), fileValidation, (req, res) => {
  console.log(req.file);
  res.json(`/${req.file.path}`);
});

module.exports = router;
