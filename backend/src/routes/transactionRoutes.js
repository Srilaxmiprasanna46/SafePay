const express = require("express");

const {
    createTransaction,
    confirmTransaction
} = require("../controllers/transactionController");

const router = express.Router();

router.post("/", createTransaction);

router.post("/:id/confirm", confirmTransaction);

module.exports = router;