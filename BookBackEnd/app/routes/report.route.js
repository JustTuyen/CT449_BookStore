const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
// Create a new Book
router.get("/", reportController.findAll);
router.post("/", reportController.create);
router.get("/card/:id", reportController.findByCard);

router.get("/:id", reportController.findOne);
router.put("/:id", reportController.update);
router.delete("/:id", reportController.delete);
module.exports = router;