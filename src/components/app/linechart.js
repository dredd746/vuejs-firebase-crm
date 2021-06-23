import { Line,Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.chartData este in mixin.
    this.renderChart(this.chartData, this.options)
  }
}