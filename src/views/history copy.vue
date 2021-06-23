<template>
    <div>
  <div class="page-title">
    <h3>История записей</h3>
  </div>
   
   <loader v-if="loading" />
   <p class="center" v-else-if="!records.length"> У вас нет записей<br> 
  <router-link to="/record"> <button class="btn waves-effect waves-light">Добавить запись </button></router-link></p>

   <div v-else>
  <div class="history-chart">
    <canvas></canvas>
  </div>

  <section>
    <historyTable
    :records="records"
    />
    <paginate 
  :page-count="pageCount"
  :click-handler="pageChangeHandler"
  :prev-text="'Назад'"
  :next-text="'Вперед'"
  :container-class="'pagination'"
  :page-class="'waves-effect'"
    />
  </section>
</div></div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import historyTable from '@/components/historyTable'
export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading:true ,
    records: [],
    categories: []
  }),
  async mounted(){
    //this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')

    this.records = records.map(record => {
      return {
        ...record,
        categoryName: this.categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'venit' : 'consum',
        typePlus: record.type === 'income' ? '+' : '-'
      }
    })
    this.loading = false
  },
  components: {
    historyTable
  },
  methods: {
    pageChangeHandler(){

    }
  }
}
</script>