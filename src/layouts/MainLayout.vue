<template>
    <div>
      <loader v-if="loader" />
  <div v-else class="app-main-layout">

  <navbar @click="isOpen = !isOpen" />

  <sidebar v-model="isOpen"/>  
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
          <router-view />
      </div>
      </main>

<div class="fixed-action-btn">
  <router-link class="btn-floating btn-large blue" to="/record_workers">
    <i class="large material-icons">add</i>
  </router-link>
</div>

</div>
</div>
</template>

<script>
import navbar from '@/components/app/navbar'
import sidebar from '@/components/app/sidebar'
import Loader from '../components/app/loader.vue'
import messages from '@/utils/messages'
export default {
  name: 'main-layout',
  data: () => ({
    isOpen : true,
    loading: true
  }),
  async mounted(){
    if (!Object.keys(this.$store.getters.info).length) {
       await this.$store.dispatch('getUserInfo')
    }

    this.loading = false
  },
  components: {
    navbar,sidebar,
    Loader
  },
  computed: {
        error() {
            return this.$store.getters.error
        }
    },
    watch: {
        error(fbError){
            console.log(fbError)
            this.$error(messages[fbError.code] || fbError.message )
        }
    }
}
</script>
