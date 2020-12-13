<template>
  <div class="Graph_wrap">
    <div class="ticks" v-if="popGraphData">人口(千)</div>
    <div class="Graph">
      <LineChart
        :chart-data="popGraphData"
        :options="graphOptions"
        v-show="popGraphData"
      />
      <div class="no-select" v-show="!popGraphData">
        都道府県を選択してください
      </div>
    </div>
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
      onResize: (context, size) => {
        if (size.width < 550) {
          context.options.legend.position = 'bottom'
          context.options.legend.align = 'center'
        } else {
          context.options.legend.position = 'right'
          context.options.legend.align = 'start'
        }
        console.log(context.options.scales.yAxes)
      },
      legend: {
        align: window.screen.width < 550 ? 'center' : 'start',
        position: window.screen.width < 550 ? 'bottom' : 'right',
        labels: {
          padding: 10,
        },
      },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: '年',
            },
            gridLines: {
              display: true,
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
            scaleLabel: {
              display: false,
              labelString: '人口(千)',
            },
            gridLines: {
              color: '#f3f3f3',
              zeroLineColor: '#ddd',
            },
            ticks: {
              fontColor: '#333',
              fontSize: 10,
              min: 0,
              stepSize: 1000000,
              callback: function(label) {
                label = label / 1000
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
.Graph_wrap {
  margin-top: 30px;
}

.Graph {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  padding: 0 0 20px 0;
}

.ticks {
  font-size: 14px;
  color: #555;
}
.Graph > div,
.no-select {
  position: relative;
  width: 70%;
  height: 600px;
  transition: 0.5s;
}

.no-select {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  text-shadow: 0 2px 8px #555;
  background-color: rgba(22, 160, 133, 0.5);
  border-radius: 2px;
}

@media screen and (max-width: 1100px) {
  .Graph > div,
  .no-select {
    width: 95%;
  }
}
@media screen and (max-width: 810px) {
  .Graph > div,
  .no-select {
    height: 500px;
  }
}
@media screen and (max-width: 610px) {
  .Graph > div,
  .no-select {
    height: 450px;
  }
}
@media screen and (max-width: 420px) {
  .Graph > div,
  .no-select {
    width: 99%;
  }
}
</style>
