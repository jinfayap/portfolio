import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

const { user } = getUser()

const useStorage = (folder) => {

    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `${folder}/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    const deleteImage = async(path) => {
        const storageRef = projectStorage.ref(path)
        try {
            const res = await storageRef.delete()
            if (res) {
            console.log('file successfully deleted from storage')
            }
        } catch (err) {
            error.value = err.message
            console.log(err.message)
        }
       
    }

    return { url, filePath, uploadImage, deleteImage }
}

export default useStorage