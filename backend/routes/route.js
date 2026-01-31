const express = require('express')

const breachController = require('../controllers/breachController')

const router = express.Router()

router.get("/get-details",breachController.getDataBreachController)

module.exports = router