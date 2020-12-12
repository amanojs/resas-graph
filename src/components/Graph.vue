<template>
  <div class="Graph">
    <LineChart :chart-data="refData" :options="graphOptions" />
  </div>
</template>

<script>
import LineChart from '@/plugins/charts/Line.js'

export default {
  components: {
    LineChart,
  },
  data: () => ({
    refData: null,
    graphOptions: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        align: 'start',
        position: 'bottom',
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
              max: 100,
              stepSize: 10,
            },
          },
        ],
      },
    },
  }),
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      this.refData = {
        labels: ['2020/04', '2020/05', '2020/06', '2020/07'],
        datasets: [
          {
            label: '宮崎県',
            fill: false,
            borderColor: '#999',
            data: [70, 90, 95, 90],
          },
          {
            label: '宮崎県',
            fill: false,
            borderColor: '#999',
            data: [20, 50, 60, 45],
          },
        ],
      }
    },
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
