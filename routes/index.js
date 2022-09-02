import express from "express";
import { ProductDao } from "../DAOs/index.js";

const router = express.Router();

router.route("/")
.get((req, res) => {
    res.json("Welcome to Mistshop! - Work in progress")
})

router.route("/secret")
.get((req, res) => {
    res.json("Are you looking for something?")
})

router.route("/products")
.post(async (req, res) => {
    const response = await ProductDao.writeDoc(req.body);
    res.json(response);
})
.get(async (req, res) => {
    const response = await ProductDao.getAll();
    res.json(response);
})

export default router;