<template>
  <div class="skills blackbg section">
      <h3 class = 'header'>My Skills set</h3>

      <div class = 'skillset'>
          <div v-for = 'skill in skills' class = 'skill-pill' :key = skill.id>
              <div class = 'skill-value'>{{ skill.skill }}</div>
              <!-- <div class = 'skillbar'> 
                  <span :style = "{color: 'black', 'user-select': 'none'}">{{ skill.proficiency }}</span>
                  <span class = 'percentage' :style = "{width: skill.proficiency + '%'}">{{ skill.proficiency }}%</span>
              </div> -->
              <div class="controls" v-if = 'ownership'>
                  <span class="material-icons" @click = 'handleDelete(skill.id)'>delete</span>
                  <span class="material-icons" @click = 'handleUpdate(skill.id)' >edit</span>
              </div>
          </div>
      </div>

      <AddSkill v-show = '!showAddSkill'/>

      <div class = 'toggleSkill' v-if = 'ownership'>
        <button v-if = 'showAddSkill' @click = 'showAddSkill = !showAddSkill'>Add a New Skill</button>
        <button v-else @click = 'showAddSkill = !showAddSkill'>Hide form </button>
      </div>

    
      <div class="overlay" v-if = 'showOverlay'>
        <EditSkill :id = docIdProps @close = "showOverlay = !showOverlay"/>
      </div>

  </div>

</template>

<script>
import { ref, computed } from 'vue'
import getNRTCollection from '@/composable/getNRTCollection'
import useCollection from '@/composable/useCollection'
import getUser from '@/composable/getUser'
import AddSkill from './AddSkill'
import EditSkill from './EditSkill'

export default {
    components: { AddSkill, EditSkill },
    setup() {
        const { user } = getUser()

        const showAddSkill = ref(true)

        const { documents:skills, error } = getNRTCollection('skills')
        const { deleteDoc } = useCollection('skills')

        const showOverlay = ref(false)
        const docIdProps = ref(null)

        const handleUpdate = (id) => {
            showOverlay.value = true
            docIdProps.value = id
        }

        const handleDelete = async(id) => {
            await deleteDoc(id)
            console.log('Document successfully deleted')
        }

        const ownership = computed(() => {
            return skills && user.value
        }) 

        return { showAddSkill, error, skills, showOverlay, docIdProps, handleUpdate, handleDelete, ownership}
    }
}
</script>

<style>
.skills {
    width: 100%;
    height: 100%;
    position: relative;
}
.skills .toggleSkill button {
    display: block;
    margin: 10px auto;
}
.skillset {
    display: flex;
    flex-direction: rows;
    flex-wrap: wrap;
    /* flex-basis: 50%; */
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}
.skill-pill {
    border: 1px solid white;
    border-radius: 20px;
    display: flex;
    width: 45%;
    margin: 10px;
    padding: 10px;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-around;
}
.skill-value {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    margin-right: 5px;
    width: 35%;
    justify-content: center;
}
.skillbar {
    outline: 1px solid white;
    width: 50%;
    position: relative;
    text-align: center;
}
.percentage {
    position: absolute;
    top: 0;
    left: 0;
    background: lightgreen;
    height: 100%;
}
.controls {
    display: flex;
    flex-wrap: nowrap;
    margin-left: 5px;
    align-items: center;
    justify-content: space-between;
}
.controls span {
    cursor: pointer;
}
.controls span.material-icons {
    font-size: 18px;
}
</style>