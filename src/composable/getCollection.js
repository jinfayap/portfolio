import { ref, watchEffect } from 'vue'
import { projectFirestore } from '../firebase/config'

const error = ref(null)
const documents = ref(null)

const useCollection = (collection, query = null) => {
    error.value = null
    let collectionRef
    if(query) {
        // Cannot do orderBy in query (limitation)
        collectionRef = projectFirestore.collection(collection)
        .where(...query)
    }else {
        collectionRef = projectFirestore.collection(collection).orderBy('createdAt', 'desc')
    }

    const unsub = collectionRef.onSnapshot(snapshot => {
        // console.log(snapshot)
        let results = []
        snapshot.docs.forEach(doc => {
             doc.data().createdAt && results.push({...doc.data(), id: doc.id})
        })

        documents.value = results
        error.value = null
    }, err => {
        documents.value = null
        error.value = 'Could not fetch the data'
    })

    watchEffect(onInvalidate => {
        onInvalidate(() => {
            unsub()
        })
    })

    return { error, documents }
}

export default useCollection