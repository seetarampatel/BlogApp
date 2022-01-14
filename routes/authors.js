// Our router module
const router = require("express").Router();

// Our controller
const AuthorsController = require("../controllers/authorsController");

// Our routes
router.post("/", AuthorsController.create);

// We have to export our changes
module.exports = router;
