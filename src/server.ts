/**
 * Module dependencies.
 */
import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as path from "path";
import * as dotenv from "dotenv";
import * as errorHandler from "errorhandler";
import expressValidator = require("express-validator");

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env.example" });

/**
 * Controllers (route handlers).
 */
import * as sampleController from "./controllers/sample";

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/**
 * Routes.
 */
app.get("/", sampleController.index);

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
