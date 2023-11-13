const routes = require("express").Router();
const Usercontrollers = require("../controllers/userController");

routes.post("/register", Usercontrollers.userRegister);

routes.get("/login", Usercontrollers.renderLoginPage);

routes.post("/login", Usercontrollers.userLogin);

routes.put("/:id/", Usercontrollers.updateUserProfile);

module.exports = routes;
