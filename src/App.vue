<template>
  <div id="app">
    <Header msg="환영합니다!"/>
    <Home />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/template/HeaderLayout';
import Footer from './components/template/FooterLayout';
import Home from './views/Home';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Home
  }
}
</script>