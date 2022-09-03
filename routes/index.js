import express from "express";
import { ProductService } from "../Services/index.js";

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
    const response = await ProductService.writeDoc(req.body);
    res.json(response);
})
.get(async (req, res) => {
    const response = await ProductService.getAll();
    res.json(response);
})

export default router;