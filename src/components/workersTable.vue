<template>
        <table>
      <thead>
      <tr>
        <th>#</th>
        <th>Numele muncitorului</th>
        <th>Data de adaugare</th>
        <th>Client</th>
        <th>Status</th>
        <th>Rata de intrare</th>
        <th>Rata de iesire</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record,idx) of records"
      :key="record.id"
      >
        
        <td>{{idx + 1}}</td>
        <td>{{record.name}}</td>
        <td>{{record.date | date('datetime')}}</td>
        <td>{{record.categoryName }}</td>
        <td>
          {{record.status }}
          <br>
          <button v-if="record.status != 'declined' & record.status != 'completed' " class="btn-small btn red" @click="change_status(record.name,record.id,'declined')">
            <i class="material-icons">remove_circle</i>
          </button>
          <button v-else class="btn-small btn red disabled">
            <i class="material-icons">remove_circle</i>
          </button>

          <button v-if="record.status != 'working' & record.status != 'declined' &record.status != 'completed' " class="btn-small btn " @click="change_status(record.name,record.id,'working')">
            <i class="material-icons">work</i>
          </button>
          <button v-else class="btn-small btn red disabled">
            <i class="material-icons">work</i>
          </button>

          <button v-if="record.status != 'completed' & record.status != 'declined'" class="btn-small btn black" @click="change_status(record.name,record.id,'completed')">
            <i class="material-icons">update</i>
          </button>
          <button v-else class="btn-small btn red disabled">
            <i class="material-icons">update</i>
          </button>

          <!-- <button class="btn-small btn " @click="test(record.id)">
            <i class="material-icons">work</i>
          </button>
          <button class="btn-small btn black" @click="test(record.id)">
            <i class="material-icons">update</i>
          </button> -->
           <!-- <a
                class="dropdown-trigger black-text"
                href="#"
                data-target="dropdown1"
                ref="dropdown1"
            >
              {{record.status }}
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown1' class='dropdown-content'>
              <li ><b>Изменить статус</b></li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a href="#" class="black-text" @click="change_status(record.id,'declined')">
                  <i class="material-icons">remove_circle</i>отклонен
                </a>
                <button class="btn-small btn" @click="$router.push(`/detail/` + record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li >
                <a href="#" class="black-text" @click="change_status(record.id,'working')">
                  <i class="material-icons">work</i>работает
                </a>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li >
                <a href="#" class="black-text" @click="change_status(record.id,'completed')">
                  <i class="material-icons">work</i>завершил
                </a>
              </li>
            </ul> -->
          <!-- <span class="white-text badge"
          :class="[record.typeClass]"
          >{{record.typeText}}</span> -->
        </td>
        <td>{{record.amount_in}}</td>
        <td>{{record.amount_out}}</td>
      </tr>
      </tbody>
    </table>
</template>

<script>
export default {
  data: () => ({
        //dropdown1: null,
    }),
    props: {
        records: {
            required: true,
            type: Array
        }
    },
     computed: {
      name() {
        return this.$store.getters.info.name
      }
    },
    // mounted(){
    //     M.AutoInit();
    // },
    // beforeDestroy(){
    //     if (this.dropdown1 && this.dropdown1.destroy )
    //     {this.dropdown1.destroy}
    // },
    methods: {
      async change_status(name,id,status){
        
        const newData = {
            id: id,
            status: status
          }
            await this.$store.dispatch('updateWorkersStatus',newData)
            
          this.$message(`Statutul ${name} a fost schimbat pe ${status}`)
        },
         test(id) {
            this.$message(id)
        }
    },
}
</script>
