const fs = require('fs');

const fileValidation = (req, res, next) => {
  if (!req.file || !req.body) {
    return res.status(400).json({
      error: 'Can not upload file',
    });
  }

  console.log(req.file.mimetype);

  let image = req.file.path;

  if (
    !req.file.mimetype.includes('jpeg') &&
    !req.file.mimetype.includes('jpg') &&
    !req.file.mimetype.includes('png')
  ) {
    fs.unlinkSync(image);
    return res.status(400).json({ errors: 'File not supported' });
  }

  if (!image) {
    return res.status(400).json({ errors: 'All fields required' });
  }
  next();
};

module.exports = {
  fileValidation,
};
