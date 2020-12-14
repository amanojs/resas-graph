<template>
  <div id="app">
    <Header />
    <Form />
    <div class="graph_wrap" ref="target">
      <Graph />
    </div>
    <div class="go-graph" @click="startScroll" ref="goGraph">
      グラフを見る
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Form from '@/components/Form'
import Graph from '@/components/Graph'

export default {
  name: 'App',
  components: {
    Header,
    Form,
    Graph,
  },
  data: () => ({
    goFlag: true,
  }),
  mounted() {
    window.onscroll = () => {
      if (
        this.$refs.target.offsetTop <
        window.scrollY + this.$refs.target.clientHeight
      ) {
        this.$refs.goGraph.style.opacity = '0'
        this.$refs.goGraph.setAttribute('disabled', true)
      } else {
        this.$refs.goGraph.style.opacity = '100'
      }
    }
  },
  methods: {
    startScroll() {
      window.scrollTo({
        top: this.$refs.target.offsetTop - 30,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.go-graph {
  display: none;
  position: fixed;
  bottom: 10px;
  right: 5px;
  padding: 5px 10px;
  color: #fff;
  font-size: 13px;
  border: 0px;
  background-color: #16a085;
  border-radius: 50px;
  box-shadow: 0 0 4px #999;
  cursor: pointer;
  outline: none;
  transition: 0.2s;
}

@media screen and (max-width: 640px) {
  #app {
    padding-bottom: 30px;
  }
  .go-graph {
    display: inline-block;
  }
}

.off {
  visibility: ;
}
</style>
