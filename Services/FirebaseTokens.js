import FBContainer from "../Containers/FirebaseContainer.js";

class TokensFB extends FBContainer {
    constructor(){
        super("Tokens")
    }

    async blacklistToken(token){
        const splitToken = token.split(" ")[1];

        const docData = await this.collection.get();

        const resp = docData.docs[0].data();

        let array = resp.blacklist;
        array.push(splitToken)

        const last = await this.updateDoc(docData.docs[0].id, { blacklist: array})
        
        return last
    }

    async getBlacklist(){
        const docData = await this.collection.get();

        const resp = docData.docs[0].data();

        const array = resp.blacklist;
        return array;
    }
}

export default TokensFB;