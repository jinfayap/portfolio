<template>
    <div class="workCard">
        <div class = 'work-heading'>
            <div>{{ work.title }}</div>
            <img :src="work.imageUrl" >
            <div class = 'work-status'>Status: {{ work.status }}</div>
        </div>
        <div class="work-information">
            <div><span>Description:</span> {{ work.description }}</div>
            <div v-if = 'work.additionalInfo'><span>More Info:</span> {{ work.additionalInfo }}</div>
            <div v-if = 'work.contribution'><span>Contributions:</span> {{ work.contribution }}</div>
        </div>
        <div class="work-footer">
            <a :href="work.webUrl" target="_blank" v-if = 'work.webUrl'><span class="material-icons">language</span></a>
            <div class="controls" v-if = 'ownership'>
                <span class="material-icons" @click = 'handleDelete(work.id, work.filePath)'>delete</span>
                <router-link :to = "{name : 'EditLatestWork', params: { id: work.id } }">
                    <span class="material-icons">edit</span>
                </router-link>
                
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import getUser from '@/composable/getUser'
import useCollection from '@/composable/useCollection'
import useStorage from '@/composable/useStorage'

export default {
    props: [ 'work' ],
    setup(props) {
        const { user } = getUser()
        const { deleteImage } = useStorage('portfolio')
        const { deleteDoc } = useCollection('latestwork')

        const handleDelete = async(id, path) => {
            await deleteImage(path)
            await deleteDoc(id)
        }

        const ownership = computed(() => {
            return props.work && user.value
        }) 

        return { handleDelete, ownership }
    }
}
</script>

<style>
.workCard {
    width: 350px;
    height: 400px;
    border:1px solid black;
    margin: 15px 0;
    position: relative;
    text-align: center;
}
.workCard .work-heading div {
    font-weight: 600;
    text-align: center;
    padding: 10px 0;
}
.workCard .work-heading img {
    width: 75%;
    max-height: 150px;
    object-fit: cover;
}
.workCard .work-heading .work-status {
    letter-spacing: 2px;
    font-size: 10px;
}
.workCard .work-information {
    margin: 0;
    padding: 10px;
    font-size: 13px;
    height: 42%;
    text-align: start;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
}
.workCard .work-information div span {
    letter-spacing: 2px;
    font-weight: 500;
}
.workCard .work-information div:not(first-child) {
    margin-top: 10px;
}
.workCard .work-information div:nth-child(3) {
    font-size: 11px;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.workCard .work-information::-webkit-scrollbar {
    display: none;
}
.workCard .work-information .contribution {
    font-size: 11px;
}
.work-footer {
    position: absolute;
    bottom: 0;
    /* left: 50%;
    transform: translate(-50%, 0); */
    border-top: 1px solid black;
    width: 100%;
    display: flex;
}
.work-footer a{
    margin-left: auto;
}
.work-footer .controls {
    margin-left: auto;
    display: flex;
}
</style>