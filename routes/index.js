import express, { json } from "express";
import { ProductService, UsersService } from "../Services/index.js";

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

router.route("/cookie")
.get((req, res) => {
    res.cookie("cookie_name" , 'cookie_value').send('Cookie is set');
})

router.route("/login")
.post(async (req, res) => {
    const response = await UsersService.findByProp("email", req.body.email)
    res.json(response);
})

router.route("/register")
.post(async (req, res) => {
    const response = await UsersService.writeDoc(req.body);
    res.json(response);
})

router.route("/test")
.get(async (req, res) => {
    const response = await ProductService.findByProp("name", "Tin Dust", "price", "35");
    res.json(response);
})

export default router;