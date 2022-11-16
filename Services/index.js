import dotenv from "dotenv";
dotenv.config();

let ProductService;
let CartService;
let UsersService;
let OrdersService;
let TokensService;

switch(process.env.DATABASE.toUpperCase() || "FIREBASE"){
    case "FIREBASE":
        const {default: FirebaseProduct} = await import("./FirebaseProducts.js");
        const {default: FirebaseCart} = await import("./FirebaseCarts.js");
        const {default: FirebaseUsers} = await import("./FirebaseUsers.js");
        const {default: FirebaseOrders} = await import("./FirebaseOrders.js");
        const {default: FirebaseTokens} = await import("./FirebaseTokens.js");

        ProductService = new FirebaseProduct;
        CartService = new FirebaseCart;
        UsersService = new FirebaseUsers;
        OrdersService = new FirebaseOrders;
        TokensService = new FirebaseTokens;
        break;
}

export {ProductService, CartService, UsersService, OrdersService, TokensService};