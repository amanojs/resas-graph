<template>
  <div class="Graph">
    <LineChart
      :chart-data="popGraphData"
      :options="graphOptions"
      v-show="popGraphData"
    />
  </div>
</template>

<script>
import LineChart from '@/plugins/charts/Line.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    LineChart,
  },
  data: () => ({
    graphOptions: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        align: 'start',
        position: 'right',
        labels: {
          padding: 15,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            // 目盛り設定
            ticks: {
              fontColor: '#333',
            },
          },
        ],
        // Y軸設定
        yAxes: [
          {
            gridLines: {
              color: '#f3f3f3',
              zeroLineColor: '#ddd',
            },
            ticks: {
              fontColor: '#333',
              min: 0,
              stepSize: 1000000,
              callback: function(label) {
                return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              },
            },
          },
        ],
      },
    },
  }),
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters(['popGraphData']),
  },
}
</script>

<style lang="scss" scoped>
.Graph > div {
  position: relative;
  width: 900px;
  height: 700px;
}
</style>
