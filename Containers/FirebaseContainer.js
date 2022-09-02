import admin from "firebase-admin";

import account from "../configFiles/firebase-key.json" assert { type: "json"};

admin.initializeApp({
    credential: admin.credential.cert(account),
})

const db = admin.firestore()

class FBContainer{
    constructor(collName){
        this.collection = db.collection(collName);
    }

    async writeDoc(obj) {
        obj.timestamp = Date.now();
        
        try {
            await this.collection.doc().create(obj)
            return {ok: `Documento guardado con éxito.`}
        } catch (error) {
            console.log(`Ocurrió un error al guardar el documento, ${error}`)
        }
    }

    async getAll(){
        try {
            const docData = await this.collection.get();

            const resp = docData.docs.map((el) => ({
                id: el.id,
                ...el.data(),
            }))
            return resp;
        } catch (error) {
            console.log(`Error al buscar los documentos, ${error}`)
        }
    }

    async getOne(id){
        try {
            const docData = await this.collection.doc(id).get()
            return (docData.data() ? docData.data() : `Error al buscar el documento con id ${id}`)
        } catch (error) {
            console.log(`Error al buscar el documento con id ${id}`)
        }
    }

    async updateDoc(obj, id){
        obj.id = id;
        obj.timestamp = Date.now();

        try {
            await this.collection.doc(id).update(obj)
            return {ok: `Documento actualizado correctamente.`}
        } catch (error) {
            console.log(`Error al actualizar el documento, ${error}`)
        }
    }

    async deleteDoc(id){
        try {
            await this.collection.doc(id).delete({exists: true})
            return {ok: `Documento borrado con éxito.`}
        } catch (error) {
            console.log(`Error al borrar el documento, ${error}`)
        }
    }
}

export default FBContainer;