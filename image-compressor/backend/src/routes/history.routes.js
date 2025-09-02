const router = require("express").Router();
const { getHistory } = require("../controllers/history.controller");
const auth = require("../middleware/auth.middleware");

router.get("/",auth, getHistory);

module.exports = router;