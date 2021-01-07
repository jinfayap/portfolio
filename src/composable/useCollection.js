import {ref} from 'vue'
import {projectFirestore} from '../firebase/config'

const useCollection = (collection) => {
    const error = ref(null)
    const isPending = ref(false)

    const addDoc = async (doc) => {
        error.value = null
        isPending.value = true
        try {
            const res = await projectFirestore.collection(collection).add(doc)
            isPending.value = false
            return res
        } catch (err) {
            console.log(err.message)
            error.value = err.message
            isPending.value = false
        }
    }
    
    const updateDoc = async(doc, id) => {
        error.value = null
        isPending.value = true
        try {
            const docRef = projectFirestore.collection(collection).doc(id)
            const res = await docRef.update(doc)
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = err.message
            isPending.value = false
        }
    }

    const deleteDoc = async(id) => {
        error.value = null
        isPending.value = true

        try {
            const docRef = projectFirestore.collection(collection).doc(id)
            await docRef.delete()
            isPending.value = true
        } catch(err) {
            error.value = err.message
            console.log(err.message)
            isPending.value = false
        }
        
    }


    return {error, isPending, addDoc, updateDoc, deleteDoc}
}

export default useCollection