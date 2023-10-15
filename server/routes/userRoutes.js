const routes = require("express").Router();
const Usercontrollers = require("../controllers/userController");

routes.post("/register", Usercontrollers.userRegister);

routes.get("/login", Usercontrollers.userLogin);

module.exports = routes;
