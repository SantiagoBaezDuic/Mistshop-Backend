import FBContainer from "../Containers/FirebaseContainer.js";
import { encryptPassword, comparePassword } from "./bcrypt/index.js";

class UsersFB extends FBContainer {
    constructor(){
        super("Users")
    }

    async Register(obj){
        const comparison = await this.findByProp("email", obj.email)
        if(comparison.content === "empty"){
            let hash = await encryptPassword(obj.password);
            let data = {
                username: obj.username,
                email: obj.email,
                password: hash,
                admin: false
            }
            const content = await this.writeDoc(data)
            return content;
        } else {
            return { error: "Email already associated to an existing account."}
        }
    }

    async Authentication(obj){
        const comparison = await this.findByProp("email", obj.email)
        if(comparison.content === "empty"){
            return { error: "No account associated to this email."}
        } else {
            const content = await comparePassword(obj.password, comparison[0].password)
            if(content){
                return { ok: "Credentials authenticated."}
            } else {
                return { error: "Credentials don't match"}
            }
        }
    }
}

export default UsersFB;