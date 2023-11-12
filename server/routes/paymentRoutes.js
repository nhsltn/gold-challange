const routes = require("express").Router();
const Paymentcontrolers = require("../controllers/paymentController");

routes.post("/:id", Paymentcontrolers.processPayment);

module.exports = routes;
