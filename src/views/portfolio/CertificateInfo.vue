<template>
    <div class = 'error' v-if = 'error'>{{ error }}</div>
    <div class = 'grid-layout'>
        <div class = 'cert-info' v-if = 'certificate'>
            <div class="cert-info-title">
                {{ certificate.title }}
            </div>
            <div class = 'cert-info-img'>
                <img :src="certificate.imageUrl">
            </div>
        </div>
        <div class = 'side-layout' v-if = 'certificate'>
            <div class = 'cert-info-link'>
                <p>Interested parties, course can be found <a :href="certificate.webUrl" target = "_blank"><span>here</span></a></p>
            </div>
            <div>
                <button>Edit Certificate</button>
                <button @click = 'handleDelete'>Delete Certificate</button>
            </div>
        </div>
    </div>
</template>

<script>
import getDocument from '@/composable/getDocument'
import useCollection from '@/composable/useCollection'
import useStorage from '@/composable/useStorage'
import { useRoute, useRouter } from 'vue-router'

export default {
    props: [ 'id' ],
    setup(props) {

        const route = useRoute()
        const router = useRouter()

        const { document: certificate, error } = getDocument('certificates', route.params.id)
        const { deleteDoc, error: deleteError} = useCollection('certificates')
        const { deleteImage, error: deleteImageError } = useStorage('portfolio', 'certificates')

        const handleDelete = async() => {
            await deleteImage(certificate.value.filePath)
            if (!deleteImageError.value) {
                await deleteDoc(props.id)
                if (!deleteError.value) {
                    router.push({ name: 'Home' })
                }
            }

        }
        return { certificate, error, handleDelete }
    }
}
</script>

<style>
.grid-layout {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 20px;
}
.cert-info {
    border: 1px dashed black;
    max-width: 650px;
    max-height: 650px;
    margin: 0 auto;
}
.cert-info-title {
    font-size: 3em;
    text-align: center;
    letter-spacing: 3px;
    text-transform: uppercase;
}
.cert-info-img img{
    max-width: 100%;
}
.cert-info-link {
    font-size: 1.5em;
}
.cert-info-link span {
    font-size: 1.8em;
    color: blue;
    text-decoration: underline;
}
.side-layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.side-layout:nth-child(2) div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1em;
}

</style>