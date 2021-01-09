<template>
  <div class="section">
    <h3 class="header">Contact Me</h3>
    <div class="contactme">

      <div v-if = 'contacts' class="social-media">
        <div v-for = 'contact in contacts' :key = 'contact.id'>

              <h3>Also can find me at: </h3>
              <div><a :href="contact.linkedin" target = '_blank'><img src="../assets/images/icons/linkedin.png"></a></div>
              <div><a :href="contact.github" target = '_blank'><img src="../assets/images/icons/github.png"></a></div>
              <div>
                <img src="../assets/images/icons/mail.png">
                <span>{{ contact.email }}</span>
                </div>
              <router-link :to = "{ name: 'EditContactMe', params: {id : contact.id}}">
                <button>Edit Contact Me</button>
              </router-link>
        </div>
      </div>

      <div class="contact-details">
        <form>
          <div class="inputBox">
            <input type="text" placeholder = ' ' required disabled>
            <label>Name:</label>
          </div>

          <div class="inputBox">
            <input type="email" placeholder = ' ' required disabled>
            <label>Your Email:</label>
          </div>

          <div class="inputBox">
            <input type="text" placeholder = ' ' required disabled>
            <label>Subject:</label>
          </div>

          <textarea placeholder = 'Your message' required disabled></textarea>
          <button disabled>Submit</button>

        </form>
      </div>
    </div>
    
  </div>
  
</template>

<script>
import getNRTCollection from '@/composable/getNRTCollection'

export default {
  setup() {
    const { documents: contacts, error } = getNRTCollection('contactme')

    return { contacts }
  }
}
</script>

<style scoped>
.contactme {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}
button {
  display: block;
  margin: 10px auto;
}
input, textarea {
  all: unset;
}
.inputBox {
  position: relative;
}
.inputBox input {
  width: 100%;
  border: none;
  outline: none;
  border-bottom: 1px solid black;
  padding: 10px 5px;
  letter-spacing: 1px;
  font-size: 16px;
  margin-bottom: 30px;
}
.inputBox label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 5px;
  pointer-events: none;
  transition: 0.5s ease;
  font-weight: 500;
}
.inputBox input:focus ~ label, 
.inputBox input:valid ~ label {
  top: -20px;
  font-size: 12px;
}
.inputBox input:valid ~ label {
  color: lime;
}
.inputBox input:not(:placeholder-shown):invalid ~ label {
  top: -20px;
  color: red;
}

textarea {
  height: 100px;
  border: 1px solid black;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}
.social-media{
  display: flex;
}
.social-media div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
}
.social-media div:nth-child(4) {
  flex-direction: row;
  align-items: center;
}
.social-media div:nth-child(4) span{
  margin-left: 30px;
  font-size: 10px;
  font-weight: 300;
}
.social-media div img {
  max-height: 50px;
}

</style>