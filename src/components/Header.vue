<template>
  <div class="Header">
    <h1>RESAS GRAPH</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style>
.Header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 4%;
  text-align: left;
  background-color: #16a085;
  margin-bottom: 20px;
  color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 8px #999;
}

@media screen and (max-width: 640px) {
  .Header {
    justify-content: center;
    font-size: 12px;
  }
}
</style>
