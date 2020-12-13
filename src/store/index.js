import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    population: [],
    popGraphData: null,
  },
  getters: {
    population: state => state.population,
    popGraphData: state => state.popGraphData,
  },
  mutations: {
    setPopulation(state, population) {
      state.population = population
    },
    setPopGraphData(state, data) {
      state.popGraphData = data
    },
  },
  actions: {
    async getPopulationFromApi({ state, commit }, prefs) {
      const RESAS_KEY = process.env.VUE_APP_RESAS_KEY
      const RESAS_END = process.env.VUE_APP_RESAS_END
      if (!RESAS_KEY || !RESAS_END) {
        alert('システムに問題が発生しました')
        console.error('RESASに関する環境変数が読み込めません')
        throw new Error()
      }
      let prefsPopData = state.population

      console.log(prefs.length)
      if (prefs.length === 0) {
        commit('setPopulation', [])
        commit('setPopGraphData', null)
        return
      }

      // ===APIアクセスを減らすためにフィルタリング処理===
      if (state.population.length !== 0) {
        const statePop = state.population
        // 不足分を算出
        const notEnough = prefs.filter(item1 => {
          const notMatch = statePop.filter(
            item2 => item1.prefCode === item2.prefCode
          )
          return notMatch.length === 0
        })
        // 過多文を算出
        const excess = statePop.filter(item1 => {
          const notMatch = prefs.filter(
            item2 => item1.prefCode === item2.prefCode
          )
          return notMatch.length === 0
        })
        prefs = notEnough
        // 過多文を切り取った配列をセット
        if (excess.length !== 0) {
          const concatState = statePop.filter(stateVal => {
            const notMatch = excess.filter(
              excessVal => stateVal.prefCode === excessVal.prefCode
            )
            return notMatch.length === 0
          })
          prefsPopData = concatState
        }
      }
      for await (const pref of prefs) {
        const params = {
          prefCode: pref.prefCode,
        }
        // あとで関数化
        const { data } = await axios.get(
          RESAS_END + '/api/v1/population/composition/perYear',
          {
            headers: {
              'Content-Type': 'application/json',
              'X-API-KEY': RESAS_KEY,
            },
            params,
          }
        )
        const prefPopulation = {
          prefCode: pref.prefCode,
          prefName: pref.prefName,
          population: data.result.data[0].data,
        }
        prefsPopData.push(prefPopulation)
      }
      commit('setPopulation', prefsPopData)
      // 都道府県ごとのグラフデータフォーマット
      if (prefsPopData.length !== 0) {
        const datasets = []
        for (const prefData of prefsPopData) {
          const datas = []
          for (const data of prefData.population) {
            datas.push(data.value)
          }
          datasets.push({
            label: prefData.prefName,
            fill: false,
            borderColor: '#999',
            data: datas,
          })
        }
        // ラベル作成
        const labels = []
        for (const data of prefsPopData[0].population) {
          labels.push(data.year)
        }
        const graphData = {
          labels,
          datasets,
        }
        commit('setPopGraphData', graphData)
      } else {
        commit('setPopGraphData', null)
      }
    },
  },
})
