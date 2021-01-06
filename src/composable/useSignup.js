import {projectAuth} from '../firebase/config'
import {ref} from 'vue'

const error = ref(null)
const isPending = ref(false)

const signUp = async (email, password, displayName) => {
    isPending.value = true
    error.value = null
    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        if(!res) {
            throw new Error('Could not complete the signup')
        }
        await res.user.updateProfile({displayName})
        isPending.value = false
        error.value = null
        return res
    } catch (err) {
        error.value = err.message
        isPending.value = false
    }  
}

const useSignup = () => {
    return {signUp, error, isPending}
}

export default useSignup