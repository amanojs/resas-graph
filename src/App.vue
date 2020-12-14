<template>
  <div id="app">
    <Header />
    <Form />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Form from '@/components/Form'

export default {
  name: 'App',
  components: {
    Header,
    Form,
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
.go-graph {
  display: none;
  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 5px;
  border-radius: 50px;
  cursor: pointer;
}

@media screen and (max-width: 640px) {
  #app {
    padding-bottom: 30px;
  }
  .go-graph {
    display: inline-block;
  }
}
</style>
