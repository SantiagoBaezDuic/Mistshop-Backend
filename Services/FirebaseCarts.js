import FBContainer from "../Containers/FirebaseContainer.js";
import { verifyToken } from "./jwt/index.js";

class CartFB extends FBContainer {
    constructor(){
        super("Carts")
    }

    async initializeCart(email) {
        let cart = {
            products: [],
            owner: email,
            timestamp: Date.now(),
            totalPrice: 0,
        }

        const resp = await this.writeDoc(cart);
        return resp;
    }

    async findCart(token){
        const splitted = token.split(" ")[1];
        const decode = verifyToken(splitted);
        if(decode.status === "success"){
            let cartPrice = 0;
            let cart = await this.findByProp("owner", decode.decoded.data[0].email)
            cart[0].products.map((obj) => {
                cartPrice += obj.price * obj.amount
            })
            const finalCart = {
                products: cart[0].products,
                price: cartPrice
            }
            return finalCart;
        } else {
            return decode;
        }
    }

    async updateCart(token, product, add, value) {
        const splitted = token.split(" ")[1];
        const decode = verifyToken(splitted);
        const email = decode.decoded.data[0].email;
        let cart = await this.findByProp("owner", email);
        let isInCart = cart[0].products.findIndex((obj) => {
            return obj.code === product[0].code
        })
        if(isInCart !== -1){
            if(add){
                cart[0].products[isInCart].amount += value;
                const response = await this.updateDoc(cart[0].docId, {products: cart[0].products})
                return response
            } else {
                cart[0].products.splice(isInCart, 1)
                const response = await this.updateDoc(cart[0].docId, {products: cart[0].products})
                return response
            }
        } else if (add) {
            let array = cart[0].products;
            array.push({code: product[0].code, amount: value, price: Number(product[0].price)})
            const resp = await this.updateDoc(cart[0].docId, {products: array})
            return resp
        } else {
            return { state: "failure", error: "Item not in cart."}
        }
    }

    async finishOrder(token, prods){
        const splitted = token.split(" ")[1];
        const decode = verifyToken(splitted);
        const email = decode.decoded.data[0].email;
        const cart = await this.findByProp("owner", email);
        let priceHolder = 0;
        cart[0].products.map((obj) => priceHolder += (obj.price * obj.amount))
        let order = {
            owner: cart[0].owner,
            products: prods,
            price: priceHolder,
            timestamp: Date.now()
        }
        const emptyCart = await this.updateDoc(cart[0].docId, { products: [] })
        return {order: order, state: emptyCart}
    }
}

export default CartFB;