const express = require('express');
const router = express.Router();
const StatusService = require('../controllers/status.controller');
// Create a new Publisher
router.get("/", StatusService.findAll);
router.post("/", StatusService.create);
router.delete("/", StatusService.deleteAll);

router.get("/:id", StatusService.findOne);
router.put("/:id", StatusService.update);
router.delete("/:id", StatusService.delete);
module.exports = router;