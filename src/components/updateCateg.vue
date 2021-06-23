<template>
          <div class="col s12 m6">
        <div>
          <div class="page-subtitle">
            <h4>Redacteaza</h4>
          </div>

          <form @submit.prevent="submitHandler">
            <div class="input-field" >
              <select ref="select" v-model="current">
                <option
                v-for="c in categories"
                :key="c.id"
                :value="c.id"
                >{{c.title}}</option>
              </select>
              <label>Alege categoria</label>
            </div>

            <div class="input-field">
              <input
                  id="name"
                  type="text"
                  v-model="$v.title.$model"
                  :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
              >
              <label for="name">Denumirea</label>
              <span
              v-if=" ($v.title.$dirty && !$v.title.required)" 
              class="helper-text ">Introduceti denumirea</span>
            </div>
            <div class="input-field">
              <input
                  id="adress"
                  type="text"
                  v-model="$v.adress.$model"
                  :class="{invalid: ($v.adress.$dirty && !$v.adress.required)}"
              >
              <label for="adress">Adresa</label>
              <span
              v-if=" ($v.adress.$dirty && !$v.adress.required)" 
              class="helper-text ">Introduceti adresa</span>
            </div>
            <div class="input-field">
              <input
                  id="email"
                  type="text"
                  v-model="$v.email.$model"
                  :class="{invalid: ($v.email.$dirty && !$v.email.required)}"
              >
              <label for="email">Email</label>
              <span
              v-if=" ($v.email.$dirty && !$v.email.required)" 
              class="helper-text ">Introduceti posta</span>
            </div>

            

            <button class="btn waves-effect waves-light" type="submit">
              Send
              <i class="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    adress: '',
    email: '',
    current: null    
  }),
  validations: {
    title: {required},
    adress: {required},
    email: {required}
  },
  watch: {
    current(catId) {
      const {title,adress,email} = this.categories.find(c => c.id === catId)
      this.title = title
      this.adress = adress
      this.email = email

    }
  },
  created(){
    const {id,title,adress,email} = this.categories[0]
    this.current = id
    this.title = title
    this.adress = adress
    this.email = email
  },
  mounted(){
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields()
  },
  destroyed(){
    if (this.select && this.select.destroy){
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler() {
            if (this.$v.$invalid) {
            this.$v.$touch()
            return
        }
        try {
          const newCategoryData = {
            id: this.current,
            title: this.title,
            adress: this.adress,
            email: this.email
          }
          await this.$store.dispatch('updateCategoryInfo',newCategoryData)
          this.$message('Datele au fost schimbate')
          this.$emit('updated', newCategoryData)
        } catch(e) {}
  }
}
}
</script>