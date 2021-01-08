import { ref } from 'vue'
import { projectStorage } from '../firebase/config'
import getUser from './getUser'

// Generates Unique ID
import { v4 as uuidv4 } from 'uuid'

const { user } = getUser()

const useStorage = (folder, subfolder = null) => {

    const error = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {

        const uniqueId = uuidv4()
        const lastIndex = file.name.lastIndexOf('.')
        const name = file.name.slice(0, lastIndex) + '_' + uniqueId + file.name.slice(lastIndex)

        if (subfolder === null) {
            filePath.value = `${folder}/${user.value.uid}/${name}`
        } else {
            filePath.value = `${folder}/${user.value.uid}/${subfolder}/${name}`
        }
        
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const res = await storageRef.put(file)
            console.log(res)
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