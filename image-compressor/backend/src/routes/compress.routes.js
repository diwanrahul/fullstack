const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const multer = require('multer');

// Store file in memory so Sharp can process it
const upload = multer({ storage: multer.memoryStorage() });

const { compressImage } = require('../controllers/compress.controller');

// Route: POST /api/compress
router.post('/', auth, upload.single('file'), compressImage);

module.exports = router;
