<template>
    <div>
  <div class="page-title">
    <h3>Inscrierea platilor pentru Muncitori</h3>
  </div>

  <loader v-if="loading"/>
  <form v-else class="form" @submit.prevent="submitHandler">

    
    <div class="input-field">
      <input
          id="name"
          type="text"
          v-model="name"
          :class="{invalid: ($v.name.$dirty && !$v.name.required )}"
      >
      <label for="name">Имя</label>
      <span class="helper-text "
      v-if="($v.name.$dirty && !$v.name.required )"
      >Câmpul nu poate fi gol.</span>
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
      <label for="amount">Сумма</label>
      <span class="helper-text "
      v-if="($v.amount.$dirty && !$v.amount.minValue)"
      >Suma trebuie sa fie mai mare decat {{$v.amount.$params.minValue.min}}</span>
      <span class="helper-text "
      v-else-if="($v.amount.$dirty && !$v.amount.required )"
      >Câmpul nu poate fi gol.</span>
    </div>

    <div class="input-field">
      <input
          id="profit"
          type="number"
          v-model.number="profit"
          :class="{invalid: ($v.profit.$dirty && !$v.profit.required ) || ($v.profit.$dirty && !$v.profit.minValue) }"
      >
      <label for="profit">Профит</label>
      <span class="helper-text "
      v-if="($v.profit.$dirty && !$v.profit.minValue)"
      >Suma trebuie sa fie mai mare decat{{$v.profit.$params.minValue.min}}</span>
      <span class="helper-text "
      v-else-if="($v.profit.$dirty && !$v.profit.required )"
      >Câmpul nu poate fi gol.</span>
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
    name: '',
    category: null,
    type: 'outcome',
    amount: 1,
    description: '',
    profit: 0,
    namedUser: '',
    
  }),
  async mounted(){
    this.loading= false
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields()
    },0) //pune in rand cu renderingul la elementele din forma ca sa incarce SELECTUL

    
  },
  computed: {
    ...mapGetters(['info']),
    username() {
        this.namedUser = this.$store.getters.info.name
      },
    canCreateRecord(){
      if (this.type === 'income')
      {return true}
      return true
    }
  },
  validations: {
    amount: {required,minValue: minValue(1)},
    profit: {required,minValue: minValue(1)},
    description: {required},
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
          
          await this.$store.dispatch('createBillsOut',{
          name: this.name,
          amount: this.amount,
          description: this.description,
          type: this.type,
          profit: this.profit,
          date: new Date().toJSON(),
          userName: this.namedUser
          })

          

        await this.$store.dispatch('updateInfo')
        this.$message(`Inscrierea a fost creata`)
        this.$v.$reset()
        this.amount = 1
        this.description = ''
        this.name = ''
        this.profit = ''

        
        } catch(e) {}
        
      } else {
        this.$message(`Inscrierea nu a fost creata `)
      }
  }},
  destroyed(){
    if (this.select && this.select.destroy){
      this.select.destroy()
  }}
}
</script>