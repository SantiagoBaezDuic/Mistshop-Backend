import FBContainer from "../Containers/FirebaseContainer.js";

class CartFB extends FBContainer {
    constructor(){
        super("Carts")
    }

    async initializeCart(email) {
        let cart = {
            products: [],
            owner: email,
            timestamp: Date.now()
        }

        const resp = await this.writeDoc(cart);
        console.log(resp);
        return resp;
    }

    async asignCart() {

    }

    async updateCart(email, product, add, value) {
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
                if(cart[0].products[isInCart].amount -= value <= 0){
                    cart[0].products[isInCart].amount = 0;
                    const response = await this.updateDoc(cart[0].docId, {products: cart[0].products})
                return response
                } else {
                    cart[0].products[isInCart].amount -= value;
                    const response = await this.updateDoc(cart[0].docId, {products: cart[0].products})
                    return response
                }
            }
        } else if (add) {
            let array = cart[0].products;
            array.push({code: product[0].code, amount: value, price: product[0].price})
            const resp = await this.updateDoc(cart[0].docId, {products: array,})
        } else {
            return { state: "failure", error: "Item not in cart."}
        }
    }
}

export default CartFB;