const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');

// Create a new Book
router.get("/", bookController.findAll);
router.post("/", bookController.create);
router.get("/publisher", bookController.findNSX);
router.get("/takefive", bookController.findOnlyFive);

router.get("/:id", bookController.findOne);
router.put("/:id", bookController.update);
router.delete("/:id", bookController.delete);
module.exports = router;