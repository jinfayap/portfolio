import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)

    const docRef = projectFirestore.collection(collection).doc(id)

    const getSingleDoc = async () => {
        const res = await docRef.get()
        if (res.data()) {
            document.value = { ...res.data(), id: res.id }
        } else {
            error.value = 'that document does not exists'
        }
    }
    getSingleDoc()

    return { document, error }
}


export default getDocument