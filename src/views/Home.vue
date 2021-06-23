<template>
  <div>
  <div class="page-title">
    <h3>Pagina principala</h3>

    <!-- <button class="btn waves-effect waves-light btn-small" @click="refresh">
      <i class="material-icons">refresh</i>
    </button> -->
  </div>

    <loader v-if="loading"/>

  <div v-else class="row" >
    <homeBill />

    <homeC />

  </div>
</div>
</template>

<script>
import homeBill from '@/components/homeBill'
import homeC from '@/components/homeCurrency'
export default {
  components: {
    homeBill,homeC
  },
  data: () => ({
    loading: true,
  }),
  async mounted() {

    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true

      this.loading = false
    }
  }
}
</script>
