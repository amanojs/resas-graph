<template>
  <div id="app">
    <Header />
    <Form />
    <Graph />
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
  margin-top: 60px;
}
</style>
