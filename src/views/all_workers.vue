<template>
    <div>
  <div class="page-title">
    <h3>Muncitorii</h3>
  </div>
   
   <loader v-if="loading" />
   <div v-else>
  <section>
    <workersTable
    v-if="userStatus == 'admin'"
    :records="items"
    />
    <!-- <testTable
    :records="items"
    /> -->
    <div v-else>
      <p>Nu sunteti administrator</p>
    </div>
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
import workersTable from '@/components/AdminHistoryTableWorkers'
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
  computed: {
    userStatus(){
        return this.$store.getters.info.status
      }
  },
  async mounted(){
    this.records = await this.$store.dispatch('fetchAdminWorkers')

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

  }
}
</script>