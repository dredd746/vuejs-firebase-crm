<template>
    <div>
  <div class="page-title">
    <h3>Munctiorii</h3>
      <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button>
  </div>
   
   <loader v-if="loading" />
   <p class="center" v-else-if="!records.length">Nu aveti inscrieri<br> 
  <router-link to="/record_workers"> <button class="btn waves-effect waves-light">Adauga inscrieri </button></router-link></p>

   <div v-else>
  <router-link to="/record_workers"> <button class="btn waves-effect waves-light">Adauga inscrieri</button></router-link>
  <section>
    <workersTable
    :records="items"
    />
    <!-- <testTable
    :records="items"
    /> -->
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
import workersTable from '@/components/workersTable'
import testTable from '@/components/test-table'
import lineChart from '@/components/app/linechart'

export default {
  name: 'workers',
  mixins: [paginationMixin],
  data: () => ({
    loading:true ,
    records: [],
    categories: []
  }),
  async mounted(){
    this.records = await this.$store.dispatch('fetchWorkers')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: record.categoryId,
      }
    }).slice().reverse())
    this.loading = false
  },
  components: {
    workersTable,lineChart,testTable
  },
  methods: {
    async refresh(){
      this.loading = true
      this.records = await this.$store.dispatch('fetchWorkers')
      this.categories = await this.$store.dispatch('fetchCategories')

    this.setupPagination(this.records.map(record => {
      return {
        ...record,
        categoryName: record.categoryId,
      }
    }).slice().reverse())
    this.loading = false
    }
  }
}
</script>