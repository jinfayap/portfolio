import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const error = ref(null)
const isPending = ref(false)

const logout = async() => {
    try {
        isPending.value = true
        await projectAuth.signOut()
        isPending.value = false
    } catch (err) {
        console.log('UseLogout', err.message)
        error.value = err.message
        isPending.value = false
    }
}
const useLogout = () => {
    return { logout, error, isPending }
}

export default useLogout