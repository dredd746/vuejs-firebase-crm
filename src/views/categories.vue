<template>
    <div>
  <div class="page-title">
    <h3>Companii Clienti</h3>
  </div>
  <section>
    <loader v-if="loading"/>
    <div v-else class="row">
      
      <createCategory 
      @created="updateCategories" 
      />

      <updateCategory
      :categories="categories" 
      @updated="updateCategories"
      />

    </div>
  </section>
</div>
</template>

<script>
import createCategory from '@/components/createCateg'
import updateCategory from '@/components/updateCateg'
import Loader from '../components/app/loader.vue'
export default {
  data: () => ({
    categories: [],
    loading: true
  }),
  components: {
    updateCategory,createCategory,
    Loader
  },
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  methods: {
    // async addNewCategory(){
    //   this.categories.push(category)
      
    // },
    async updateCategories()
    {
    this.loading = true
    this.categories = await this.$store.dispatch('fetchCategories')
    //imi era lene sa fac fara query la server , ca sa fie mia optimizat ...
    this.loading = false
    }
  }
}
</script>