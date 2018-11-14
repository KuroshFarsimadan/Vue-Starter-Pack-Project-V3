<template>
  <div id="app">
    <Header/>
    <div class="app-content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from "./views/Header.vue";
import Footer from "./views/Footer.vue";

export default {
  name: "App",
  components: {
    Footer,
    Header
  }
};
</script>