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
      class="helper-text"
      v-if="$v.email.$dirty && !$v.email.required"
      >Introduceti email</small>
      <small 
      class="helper-text "
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
      class="helper-text "
      v-if="($v.password.$dirty && !$v.password.required)"
      >Introduceti parola</small>
       <small 
      class="helper-text "
      v-else-if="($v.password.$dirty && !$v.password.minLength)"
      >Parola trebuie sa fie mai mare decat {{$v.password.$params.minLength.min}} simboluri. ({{password.length}})</small>
    </div>
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model.trim="$v.name.$model"
          :class="{invalid: ($v.name.$dirty && !$v.name.required ) || ($v.name.$dirty && !$v.name.minLength) }"
      >
      <label for="name">Numele utilizatorului</label>
      <small 
      class="helper-text "
      v-if="$v.name.$dirty && !$v.name.required"
      >Introduceti numele</small>
      <small 
      class="helper-text "
      v-if="$v.name.$dirty && !$v.name.minLength"
      >Numele trebuie sa fie mai lung de {{$v.name.$params.minLength.min}} simboluri. ({{name.length}})</small>
    </div>
    <p>
      <label>
        <input type="checkbox" v-model="$v.agree.$model" />
        <span>Sunt deacord cu regulile platformei</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Înregistrare
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Logare
      <router-link to="/login">Intra in cont!</router-link>
    </p>
  </div>
</form>
</template>

<script>
import {email,required, minLength} from 'vuelidate/lib/validators'
export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {email,required},
    password: {required,minLength: minLength(6)},
    name: {required,minLength: minLength(4)},
    agree: {checked: v=> v}
  },
  methods: {
  async  submitHandler(){
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register',formData)
        this.$router.push('/')
      } catch(e) {}
     
    }
  }
}
</script>