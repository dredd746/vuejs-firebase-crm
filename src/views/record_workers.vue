<template>
    <div>
  <div class="page-title">
    <h3>Inscrierea muncitorilor</h3>
  </div>

  <loader v-if="loading"/>

  <p class="center" v-else-if="!categories.length"> Nu aveti companii clienti<br> 
  <router-link to="/add_client"> <button class="btn waves-effect waves-light">Adauga comapnie</button></router-link></p>


  <form v-else class="form" @submit.prevent="submitHandler">

    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required )}"
      >
      <label for="name">Numele muncitorului</label>
      <span class="helper-text "
      v-if="($v.name.$dirty && !$v.name.required )"
      >Câmpul nu poate fi gol.</span>
    </div>

    <div class="input-field" >
      <select ref="select" v-model="category">
        <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
        >{{c.title}}</option>
      </select>
      <label>Alegeti clientul</label>
    </div>

    <p>
      <label>
        <input
            class="with-gap"
            name="status"
            type="radio"
            value="waiting"
            v-model="status"
        />
        <span>Asteptare</span>
      </label>
    </p>

    <p>
      <label>
        <input
            class="with-gap"
            name="status"
            type="radio"
            value="working"
            v-model="status"
        />
        <span>Lucreaza</span>
      </label>
    </p>

    <div class="input-field">
      <input
          id="amount_in"
          type="number"
          v-model.number="amount_in"
          :class="{invalid: ($v.amount_in.$dirty && !$v.amount_in.required ) || ($v.amount_in.$dirty && !$v.amount_in.minValue) }"
      >
      <label for="amount_in">Rata de intrare</label>
      <span class="helper-text "
      v-if="($v.amount_in.$dirty && !$v.amount_in.minValue)"
      >Suma trebuei sa fie mai mare decat {{$v.amount_in.$params.minValue.min}}</span>
      <span class="helper-text "
      v-else-if="($v.amount_in.$dirty && !$v.amount_in.required )"
      >Câmpul nu poate fi gol.</span>
    </div>

    <div class="input-field">
      <input
          id="amount_out"
          type="number"
          v-model.number="amount_out"
          :class="{invalid: ($v.amount_out.$dirty && !$v.amount_out.required ) || ($v.amount_out.$dirty && !$v.amount_out.minValue) }"
      >
      <label for="amount_out">Rata de iesire</label>
      <span class="helper-text "
      v-if="($v.amount_out.$dirty && !$v.amount_out.minValue)"
      >Suma trebuie sa fie mai mare decat {{$v.amount_out.$params.minValue.min}}</span>
      <span class="helper-text "
      v-else-if="($v.amount_out.$dirty && !$v.amount_out.required )"
      >Câmpul nu poate fi gol.</span>
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
    select: null,
    amount_in: 0,
    amount_out: 0,
    name: '',
    category: null,
    categories: [],
    status: '',
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
      return true
    }
  },
  validations: {
    amount_in: {required,minValue: minValue(1)},
    amount_out: {required,minValue: minValue(1)},
    name: {required}
  },
  methods: {
  async submitHandler(){
    this.namedUser = this.$store.getters.info.name
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.canCreateRecord){
        try {
          await this.$store.dispatch('createWorkers',{
          categoryId: this.categories.find(c => c.id === this.category).title,
          name: this.name,
          status: this.status,
          amount_in: this.amount_in,
          amount_out: this.amount_out,
          date: new Date().toJSON(),
          userName: this.namedUser
          })

        await this.$store.dispatch('updateInfo')
        this.$message(`Muncitorul a fost adaugat`)
        this.$v.$reset()
        this.amount_in = 0
        this.amount_out = 0
        this.name = ''

        
        } catch(e) {}
        
      } else {
        this.$message(`Bug 47. Verifica fisierul record_workers`)
      }
  }},
  destroyed(){
    if (this.select && this.select.destroy){
      this.select.destroy()
  }}
}
</script>