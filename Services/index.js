import dotenv from "dotenv";
dotenv.config();

let ProductService;
let CartService;

switch(process.env.DATABASE.toUpperCase() || "FIREBASE"){
    case "FIREBASE":
        const {default: FirebaseProduct} = await import("./FirebaseProducts.js");
        const {default: FirebaseCart} = await import("./FirebaseCarts.js");

        ProductService = new FirebaseProduct;
        CartService = new FirebaseCart;
        break;
}

export {ProductService, CartService};