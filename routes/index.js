import express from "express";
import { CartService, ProductService, UsersService } from "../Services/index.js";

const router = express.Router();

router.route("/")
.get((req, res) => {
    res.json("Welcome to Mistshop! - Work in progress")
})

router.route("/secret")
.get((req, res) => {
    res.json("There's always another secret...")
})

router.route("/products")
.post(async (req, res) => {
    if(req.session.admin){
        const response = await ProductService.loadProduct(req.body);
        res.json(response);
    } else {
        res.json({ error: "Insufficient permissions."})
    }
})
.get(async (req, res) => {
    const response = await ProductService.getAll();
    res.json(response);
})

router.route("/login")
.post(async (req, res) => {
    const response = await UsersService.Authentication(req.body)
    if(response.state !== "success"){
        res.json(response)
    } else {
        req.session.user = response.user;
        req.session.admin = response.admin;
        req.session.email = response.email;
        req.session.uid = response.uid;
        console.log("idlog", req.session.id)
        res.json({response: response});
    }
})

router.route("/cart")
.get(async (req, res) => {
    console.log(req.session)
    const response = await CartService.findByProp("owner", req.session.email);
    res.json(response);
})
.post(async (req, res) => {
    const prod = await ProductService.findByProp("code", req.body.code);
    const response = await CartService.updateCart(req.body.email, prod, req.body.add, req.body.amount);
    res.json(response);
})

router.route("/logout")
.get(async (req, res) => {
    req.session.destroy( error => {
        if(!error)res.send({ state: "success"})
        else res.send({ error: `Logout error.`, body: error})
    });
})

router.route("/register")
.post(async (req, res) => {
    const response = await UsersService.Register(req.body);
    console.log("accStatus", response)
    const cart = await CartService.initializeCart(req.body.email);
    console.log("cartStatus", cart)
    res.json(response);
})

router.route("/test")
.get(async (req, res) => {
    res.json("TEST");
})

export default router;