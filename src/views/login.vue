<template>
    <form class="card auth-card" @submit.prevent="submitHandler">
  <div class="card-content">
    <span class="card-title">Company CRM</span>
    <div class="input-field">
      <input
          id="email"
          type="text"
          v-model.trim="$v.email.$model"
          :class="{invalid: ($v.email.$dirty && !$v.email.required ) || ($v.email.$dirty && !$v.email.email) }"
      >
      <label for="email">Email</label>
      <small 
      class="helper-text invalid"
      v-if="$v.email.$dirty && !$v.email.required"
      >Introduceti email</small>
      <small 
      class="helper-text invalid"
      v-else-if="$v.email.$dirty && !$v.email.email"
      >Email incorect</small>
    </div>
    <div class="input-field">
      <input
          id="password"
          type="password"
          v-model.trim="$v.password.$model"
          :class="{invalid: ($v.password.$dirty && !$v.password.required ) || ($v.password.$dirty && !$v.password.minLength) }"
      >
      <label for="password">Parola</label>
      <small 
      class="helper-text invalid"
      v-if="($v.password.$dirty && !$v.password.required)"
      >Introduceti parola</small>
       <small 
      class="helper-text invalid"
      v-else-if="($v.password.$dirty && !$v.password.minLength)"
      >Parola necesita sa fie mai mare de {{$v.password.$params.minLength.min}} simboluri. ({{password.length}})</small>
    </div>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Intra
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Doresti sa-ti creezi un cont?
      <router-link to="/register">Înregistrare</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email,required, minLength} from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email,required},
    password: {required,minLength: minLength(6)}
  },
  mounted(){
    if (messages[this.$route.query.message]){
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
  async submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }
      try{
        await this.$store.dispatch('login',formData)
        this.$router.push('/')
      } catch(E){}      
      
    }
  }
}
</script>