<template>
    <div class="col s12 m6 l8">
      <div class="card white darken-3 bill-card">
        <div class="card-content black-text">
          <div class="card-header">
            <span class="card-title">Diagrama</span>
          </div>
           <div class="history-chart">
    
    <lineChart 
    :chart-data=" {
        labels: ['Lucreaza','Asteapta','Au terminat','Exclusi'],
        datasets: [{
            label: 'Inscrieri',
            data: [working,waiting,completed,declined],
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
  </div>
          <!-- <table>
            <thead>
            <tr>
              <th>zzz</th>
              <th>yyy</th>
              <th>xxx</th>
            </tr>
            </thead>

            <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            </tbody>
          </table> -->
          </div>
        </div>
      </div>
</template>

<script>
import lineChart from '@/components/app/linechart'
export default {
  data: ()=> ({
    working: 0,
    waiting: 0,
    completed: 0,
    declined: 0,
    records: [],
    r: null
  }),
    components: {
      lineChart
  },
  async mounted() {
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