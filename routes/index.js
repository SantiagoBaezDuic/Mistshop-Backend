import express from "express";

const router = express.Router();

router.route("/")
.get((req, res) => {
    res.send("Welcome to Mistshop! - Work in progress")
})

router.route("/secret")
.get((req, res) => {
    res.send("Are you looking for something?")
})

export default router;