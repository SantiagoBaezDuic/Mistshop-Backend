import FBContainer from "../Containers/FirebaseContainer.js";
import { sendMail } from "./nodemailer/index.js";

class OrderFB extends FBContainer {
    constructor(){
        super("Orders")
    }

    async saveOrder(obj) {
        const resp = await this.writeDoc(obj)
        sendMail(obj);
        return resp
    }
}

export default OrderFB;