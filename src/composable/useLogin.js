import {projectAuth} from '../firebase/config'
import {ref} from 'vue'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    isPending.value = true
    error.value = null

    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password)
        isPending.value = false
    } catch (err) {
        error.value = 'Incorrect login credentials'
        isPending.value = false
    }
}

const useLogin = () => {
    return {login, error, isPending}
}

export default useLogin