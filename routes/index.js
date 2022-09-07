import express from "express";
import { ProductService, UsersService } from "../Services/index.js";

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
    if(req.sessions.admin){
        const response = await ProductService.writeDoc(req.body);
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
        res.json({response: response});
    }
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
    res.json(response);
})

router.route("/test")
.get(async (req, res) => {
    res.json("TEST");
})

export default router;