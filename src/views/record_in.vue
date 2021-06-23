<template>
    <div>
  <div class="page-title">
    <h3>Inscrierea platilor de la companii clienti</h3>
  </div>

  <loader v-if="loading"/>

  <p class="center" v-else-if="!categories.length"> Nu aveti companii-clienti adaugate<br> 
  <router-link to="/add_client"> <button class="btn waves-effect waves-light">Adauga companie</button></router-link></p>


  <form v-else class="form" @submit.prevent="submitHandler">

    <div class="input-field" >
      <select ref="select" v-model="category">
        <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
        >{{c.title}}</option>
      </select>
      <label>Alege compania</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
        />
        <span>Venit</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
        />
        <span>Consum</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: ($v.amount.$dirty && !$v.amount.required ) || ($v.amount.$dirty && !$v.amount.minValue) }"
      >
      <label for="amount">Suma</label>
      <span class="helper-text "
      v-if="($v.amount.$dirty && !$v.amount.minValue)"
      >Suma trebuie sa fie mai mare decat {{$v.amount.$params.minValue.min}}</span>
      <span class="helper-text "
      v-else-if="($v.amount.$dirty && !$v.amount.required )"
      >Campul nu poate fi gol.</span>
    </div>
    

    <div class="input-field">
      <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: ($v.description.$dirty && !$v.description.required )}"
      >
      <label for="description">Descriere</label>
      <span class="helper-text "
      v-if="($v.description.$dirty && !$v.description.required )"
      >Câmpul nu paote fi pustiu</span>
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Creaza
      <i class="material-icons right">send</i>
    </button>
  </form>
</div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'
import loader from '../components/app/loader.vue';
import {mapGetters} from 'vuex'
export default {
  components: { loader },
  name: 'record',
  data: () => ({
    loading: true,
    categories: [],
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
    namedUser: ''
    
  }),
  async mounted(){
    
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading= false

      if (this.categories.length) {
        this.category = this.categories[0].id
      }
    
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields()
    },0) //pune in rand cu renderingul la elementele din forma ca sa incarce SELECTUL
    
    
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord(){
      if (this.type === 'income')
      {return true}
      return true
    }
  },
  validations: {
    amount: {required,minValue: minValue(1)},
    description: {required}
  },
  methods: {
  async submitHandler(){
    this.categorie = await this.$store.dispatch('fetchCategories')
    this.namedUser = this.$store.getters.info.name
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord){
        try {
          await this.$store.dispatch('createBillsIn',{
          categoryId: this.categorie.find(c => c.id === this.category).title,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
          userName: this.namedUser
          })

        await this.$store.dispatch('updateInfo')
        this.$message(`Inscrierea a fost creata`)
        this.$v.$reset()
        this.amount = 1
        this.description = ''

        
        } catch(e) {}
        
      } else {
        this.$message(`Inscrierea nu a fost creata`)
      }
  }},
  destroyed(){
    if (this.select && this.select.destroy){
      this.select.destroy()
  }}
}
</script>