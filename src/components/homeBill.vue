<template>
    <div class="col s4 m8 l4">
      <div class="card light-blue ">
        <div class="card-content white-text">
          <span class="card-title">Statistica personala</span>

          <p class="currency-line">   
            <span>Lucreaza: {{working}}</span>
          </p>
          <p class="currency-line">   
            <span>Asteapta: {{waiting}}</span>
          </p>
          <p class="currency-line">   
            <span>Au terminat: {{completed}}</span>
          </p>
           <p class="currency-line">   
            <span>Exclusi: {{declined}}</span>
          </p>
          <p class="currency-line">   
            <span> Total inscrieri: {{records.length}}</span>
          </p>
            

        </div>
      </div>
    </div>
</template>

<script>
export default {
  data: ()=> ({
    working: 0,
    waiting: 0,
    completed: 0,
    declined: 0,
    records: [],
    r: null
  }),
  async mounted(){
    var i;
    this.records = await this.$store.dispatch('fetchWorkers')

    for(i = 0; i <= this.records.length; i++) {
      if (this.records[i].status == 'working') { this.working++}
      else if (this.records[i].status == 'waiting'){this.waiting++}
      else if (this.records[i].status == 'completed'){this.completed++}
      else {this.declined++}
    }
  }
}
</script>