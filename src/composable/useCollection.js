import {ref} from 'vue'
import {projectFirestore} from '../firebase/config'

const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        try {
            isPending.value = true
            const res = await projectFirestore.collection(collection).add(doc)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message)
            error.value = err.message
            isPending.value = false
        }
    }


    return {error, isPending, addDoc}
}

export default useCollection