import dotenv from "dotenv";
dotenv.config();

let ProductDao;
let CartDao;

switch(process.env.DATABASE.toUpperCase() || "FIREBASE"){
    case "FIREBASE":
        const {default: FirebaseProduct} = await import("./FirebaseProducts.js");
        const {default: FirebaseCart} = await import("./FirebaseCarts.js");

        ProductDao = new FirebaseProduct;
        CartDao = new FirebaseCart;
        break;
}

export {ProductDao, CartDao};