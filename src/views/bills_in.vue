<template>
    <div>
  <div class="page-title">
    <h3>Istoria inscrierilor</h3>
  </div>
  
   <loader v-if="loading" />
   <p class="center" v-else-if="!records.length"> Nu aveti inscrieri<br> 
  <router-link to="/record_in"> <button class="btn waves-effect waves-light">Adauga inscriere </button></router-link></p>

   <div v-else>
     <router-link to="/record_in"> <button class="btn waves-effect waves-light">Adauga inscriere </button></router-link>
  <!-- <div class="history-chart">
    
    <lineChart 
    :chart-data=" {
        labels: categories.map(c => c.title),
        datasets: [{
            label: 'Расходы по категориям',
            data: categories.map(c => {
              return this.records.reduce((total,r) => {
                if (r.categoryId === c.id && r.type === 'outcome'){
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }"
    :height="150"
    :options="{responsive:true }"
    />
  </div> -->

  <section>
    <historyTable
    :records="items"
    />
    <paginate 
      v-model="page"
      :page-count="pageCount"
      :click-handler="pageChangeHandler"
      :prev-text="'Înapoi'"
      :next-text="'Înainte'"
      :container-class="'pagination center'"
      :page-class="'waves-effect'"
    />
  </section>
</div></div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import historyTable from '@/components/historyTable'
import lineChart from '@/components/app/linechart'

export default {
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading:true ,
    records: [],
    categories: []
  }),
  async mounted(){
    this.records = await this.$store.dispatch('fetchBillsIn')
    //const records = await this.$store.dispatch('fetchRecords')
    this. categories = await this.$store.dispatch('fetchCategories')
    

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: record.categoryID,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income' ? 'venit' : 'consum',
        typePlus: record.type === 'income' ? '+' : '-'
      }
    }).slice().reverse())
    this.loading = false
  },
  components: {
    historyTable,lineChart
  },
  methods: {

  }
}
</script>