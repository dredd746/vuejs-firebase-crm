<template>
    <ul class="sidenav app-sidenav" :class="{open: value}">

      <router-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      exact
      >
     

        <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
      </router-link>

       <div v-if="userStatus == 'admin'">
                   <a href="#" class="waves-effect waves-orange pointer">Admin menu:</a>
      <router-link
      v-for="link in AdminLinks"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      exact
      >
      <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
      </router-link>
    </div>
         </ul>
</template>

<script>
export default {
    props: ['value'],
    data: () => ({
        links: [
            {title:'Pagina principala',url:'/'},
            {title:'Muncitorii',url:'/workers'},
            {title:'Plati muncitori',url:'/bills_out'},
            {title:'Plati clienti',url:'/bills_in'},
            {title:'Clienti',url:'/clients'},
            
        ],
        AdminLinks: [
            {title:'All Workers',url:'/admin/workers'},
            {title:'All Bills Workers',url:'/admin/bills_out'},
            {title:'All Bills Clients',url:'/admin/bills_in'}     
        ]
    }),
    computed: {
    userStatus(){
        return this.$store.getters.info.status
      }
  },

}
</script>