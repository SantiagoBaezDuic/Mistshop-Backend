import admin from "firebase-admin";

const account = {
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
  }
  

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
            return { state: "success", ok: `Documento guardado con éxito.`}
        } catch (error) {
            console.log(`Ocurrió un error al guardar el documento, ${error}`)
            return { state: "failure", error: "Ha ocurrido un error al guardar el documento." }
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
            return { state: "failure", error: "Ha ocurrido un error al buscar los documentos." }
        }
    }

    async getCategory(filter){
        try {
            const docData = await this.collection.get();

            const resp = docData.docs.map((el) => ({
                id:el.id,
                ...el.data()
            }))
            
            const filtered = resp.filter((el) => {return el.type === filter})
            console.log("filtered----", filtered)
            return filtered
        } catch (error) {
            console.log(`Error al buscar los documentos, ${error}`)
            return { state: "failure", error: "Ha ocurrido un error al buscar los documentos." }
        }
    }

    async getOne(id){
        try {
            const docData = await this.collection.doc(id).get()
            return (docData.data() ? docData.data() : `Error al buscar el documento con id ${id}`)
        } catch (error) {
            console.log(`Error al buscar el documento con id ${id}`)
            return { state: "failure", error: `Error searching for document with id ${id}` };
        }
    }

    async findByProp(prop, input, prop2, input2){
        if(prop2 && input2){
            try {
                const querySnapshot = await this.collection.where(prop, "==", input).where(prop2, "==", input2).get();
                
                if (querySnapshot.empty) {
                    return { error: "No documents matching the query", content: "empty" };
                  }
                  
                  let array = [];
    
                  querySnapshot.forEach(doc => {
                    array.push(doc.data());
                    array[array.length - 1].docId = doc.id;
                  });
    
                  return array;
            } catch (error) {  
                console.log(`Error al buscar por propiedad ${prop} == ${input}`, error)
                return { state: "failure", error: `Error al buscar por propiedadades.` }
            }
        } else {
            try {
                const querySnapshot = await this.collection.where(prop, "==", input).get();
                
                if (querySnapshot.empty) {
                    return { error: "No documents matching the query", content: "empty" };
                  }
                  
                  let array = [];
    
                  querySnapshot.forEach(doc => {
                    array.push(doc.data());
                    array[array.length - 1].docId = doc.id;
                  });
    
                  return array;
            } catch (error) {  
                console.log(`Error al buscar por propiedad ${prop} == ${input}`, error)
                return { state: "failure", error: `Error al buscar por propiedad.` }
            }
        }
    }

    async updateDoc(id, data){
        try {
            await this.collection.doc(id).update(data)
            return { state: "success", ok: `Documento actualizado correctamente.` }
        } catch (error) {
            console.log(`Error al actualizar el documento, ${error}`)
            return { state: "failure", error: "Error al actualizar el documento." }
        }
    }

    async deleteDoc(id){
        try {
            await this.collection.doc(id).delete({exists: true})
            return { state: "success", ok: `Documento borrado con éxito.` }
        } catch (error) {
            console.log(`Error al borrar el documento, ${error}`)
            return { state: "failure", error: "Error al borrar el documento." }
        }
    }
}

export default FBContainer;