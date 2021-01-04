import { ref } from 'vue'
import {projectFirestore} from '../firebase/config'

const getNRTCollection = (collection) => {
    const documents = ref(null)
    const error = ref(null)

    const getDoc = async () => {
        try {
            const res = await projectFirestore.collection(collection).get()
            if(!res.empty) {
                let result = []
                res.docs.forEach(doc => {
                    result.push({...doc.data(), id: doc.id})
                })
                documents.value = result
            }
        } catch(err) {
            console.log(err.message)
        }
    }

    getDoc()

    return {documents, error}
}

export default getNRTCollection