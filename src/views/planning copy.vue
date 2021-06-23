<template>
    <div>
  <div class="page-title">
    <h3>Планирование</h3>
    <h4>{{info.bill}} &#8364; </h4>
  </div>

  <loader v-if="loading" />

  <p class="center" v-else-if="!categories.length"> Вы еще не добавили категории.<br> 
  <router-link to="/categories"> <button class="btn waves-effect waves-light">Добавить категорию </button></router-link></p>


  <section v-else>
    <div 
    v-for="cat of categories"
    :key="cat.id"
    > 
      <p>
        <strong>{{cat.title}}</strong> <br>
        {{cat.spent}}&#8364; из {{cat.limit}}&#8364;
      </p>
      <div class="progress" >
        <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{width: cat.progressPercent + '%'}"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import loader from '../components/app/loader.vue'
import {mapGetters} from 'vuex'
export default {
  components: { loader },
  name: 'planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info']),
  },
  async mounted(){
    const categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')

    this.categories = categories.map(cat => {
      const spent = records
      .filter(r => r.categoryId === cat.id)
      .filter(r => r.type === 'outcome')
      .reduce((total,record) => {
        return total += +record.amount
      },0)

      const percent = (100 * spent/ cat.limit)
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
      ? 'green'
      : percent <100
        ? 'yellow'
        : 'red'

      return {
        ...cat,
        progressPercent,
        progressColor,
        spent
      }
    })

    this.loading = false
  }
}
</script>