import dotenv from "dotenv";
dotenv.config();

let ProductService;
let CartService;
let UsersService;

switch(process.env.DATABASE.toUpperCase() || "FIREBASE"){
    case "FIREBASE":
        const {default: FirebaseProduct} = await import("./FirebaseProducts.js");
        const {default: FirebaseCart} = await import("./FirebaseCarts.js");
        const {default: FirebaseUsers} = await import("./FirebaseUsers.js");

        ProductService = new FirebaseProduct;
        CartService = new FirebaseCart;
        UsersService = new FirebaseUsers;
        break;
}

export {ProductService, CartService, UsersService};