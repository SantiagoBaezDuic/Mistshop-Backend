import FBContainer from "../Containers/FirebaseContainer.js";

class ProductsFB extends FBContainer {
    constructor(){
        super("Products")
    }

    async loadProduct(obj){
        const resp = await this.writeDoc(obj);
        return ({...resp, obj: obj});
    }
}

export default ProductsFB;