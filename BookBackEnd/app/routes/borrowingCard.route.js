const express = require('express');
const router = express.Router();
const borrowingCardController = require('../controllers/borrowingCard.controller');
// Create a new Book
router.get("/", borrowingCardController.findAll);
router.post("/", borrowingCardController.create);
router.get("/user/:id", borrowingCardController.findByUser);

router.get("/:id", borrowingCardController.findOne);
router.put("/:id", borrowingCardController.update);
router.delete("/:id", borrowingCardController.delete);
module.exports = router;