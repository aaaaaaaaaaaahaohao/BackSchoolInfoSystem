<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {};
  }
};
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}
.justify-between{
  justify-content: space-between;
}

.align-center{
  align-items: center;
}

.py-2 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.mb-1 {
  margin-bottom: 1rem;
}
.mx-1{
  margin-left: 1rem;
  margin-right :1rem;
}
</style>
