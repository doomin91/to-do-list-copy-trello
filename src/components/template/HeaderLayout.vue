<template>
  <div>
    <header>
      <!-- <h1><a href="#" class="logo"><img alt="Vue logo" src="../../assets/logo.png" width="80"></a></h1> -->
      <div class="menuWrap">
        <ul class="menu">
          <li><a href="#"><font-awesome-icon class="fa" icon="fa-regular fa-star" /></a></li>
          <li><a href="#"><font-awesome-icon icon="fa-regular fa-square" /> Boards</a></li>
          <li><a href="#"><input type="text"><font-awesome-icon icon="fa-regular fa-square" /></a></li>
          <li><a href="#"><font-awesome-icon class="fa" icon="fa-regular fa-star" /></a></li>
        </ul>
      </div>

      <div class="menuWrap">
        <ul class="menu">
          <li><a href="#"><font-awesome-icon class="fa" icon="fa-regular fa-bell" /></a></li>
          <li><a href="#"><font-awesome-icon class="fa" icon="fa-regular fa-plus-square" /></a></li>
          <li><a href="#"><font-awesome-icon class="fa" icon="fa-regular fa-note-sticky" /></a></li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'HeaderLayout',
  props: {
    msg: String
  }
}
</script>

<style scoped>


</style>