import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted() {
    try {
      this.render(this.chartData, this.options)
    } catch (error) {
      console.log('first graph rendering.')
    }
  },
}
