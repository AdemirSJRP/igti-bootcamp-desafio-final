const express = require("express");
const transactionRouter = express.Router();

var transactionService = require("../services/transactionService.js");

transactionRouter.get("/", transactionService.getByPeriod);
transactionRouter.get("/search", transactionService.getByDescription);
transactionRouter.get("/periods", transactionService.getPeriods);
transactionRouter.post("/", transactionService.create);
transactionRouter.put("/:id", transactionService.update);
transactionRouter.delete("/:id", transactionService.remove);

module.exports = transactionRouter;
