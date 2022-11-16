import express from "express";
import { CartService, ProductService, UsersService, OrdersService, TokensService } from "../Services/index.js";
import { AuthMiddleware } from "../Services/jwt/index.js";

const router = express.Router();

router.route("/")
.get((req, res) => {
    res.json("Welcome to Mistshop! - Work in progress")
})

router.route("/secret")
.get((req, res) => {
    res.json("There's always another secret...")
})

router.post("/products", AuthMiddleware, async (req, res) => {
    const response = await ProductService.loadProduct(req.body);
    res.json(response);
})
router.get("/products", async (req, res) => {
    const response = await ProductService.getAll();
    res.json(response);
})

router.get("/products/category/all", async (req, res) => {
    const response = await ProductService.getAll();
    res.json(response);
})

router.get("/products/category/metals", async (req, res) => {
    const response = await ProductService.getCategory("metal")
    res.json(response);
})

router.get("/products/category/clothing", async (req, res) => {
    const response = await ProductService.getCategory("clothing")
    res.json(response);
})

router.get("/products/category/weapons", async (req, res) => {
    const response = await ProductService.getCategory("weapon")
    res.json(response);
})

router.route("/login")
.post(async (req, res) => {
    const response = await UsersService.Authentication(req.body)
    if(response.state !== "success"){
        res.json(response)
    } else {
        res.json({response: response});
    }
})

router.get("/cart", AuthMiddleware, async (req, res) => {
    const resp = await CartService.findCart(req.headers.authorization);
    res.json(resp)
})
router.post("/cart", AuthMiddleware, async (req, res) => {
    const prod = await ProductService.findByProp("code", req.body.code);
    const response = await CartService.updateCart(req.headers.authorization, prod, req.body.add, req.body.amount);
    res.json(response);
})
router.post("/cart/buyout", AuthMiddleware, async (req, res) => {
    const resp = await CartService.finishOrder(req.headers.authorization, req.body);
    const saveOrder = await OrdersService.saveOrder(resp.order);
    res.json(saveOrder);
})

router.get("/logout", AuthMiddleware, async (req, res) => {
    const resp = await TokensService.blacklistToken(req.headers.authorization);
    res.json(resp);
})

router.route("/register")
.post(async (req, res) => {
    const response = await UsersService.Register(req.body);
    const cart = await CartService.initializeCart(req.body.email);
    res.json(response);
})

router.route("/test")
.get(async (req, res) => {
    res.json("TEST");
})

export default router;