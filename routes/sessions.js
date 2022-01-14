// Our router module
const router = require("express").Router();

// Our controller
const SessionsController = require("../controllers/sessionsController");

// Our routes
router.post(`/authenticate`, SessionsController.authenticate);
router.post(`/logout`, SessionsController.logout);

// We have to export our changes
module.exports = router;
