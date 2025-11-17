const express = require('express');
const router = express.Router();
const publisherController = require('../controllers/publisher.controller');

// Create a new Publisher
router.get("/", publisherController.findAll);
router.post("/", publisherController.create);

router.get("/:id", publisherController.findOne);
router.put("/:id", publisherController.update);
router.delete("/:id", publisherController.delete);

module.exports = router;