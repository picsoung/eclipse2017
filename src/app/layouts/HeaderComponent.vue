<template lang="html">
  <div class="hero-head">
    <header class="nav">
      <div class="container">
        <div class="nav-left">
          <a class="nav-item">
            <!-- <img src="images/bulma-type-white.png" alt="Logo"> -->
          </a>
        </div>
        <span class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div class="nav-right nav-menu">
          <a class="nav-item is-active">
            Home
          </a>
          <router-link :to="{ name: 'about', params: {} }">About</router-link>
          <a class="nav-item">
            About
          </a>
          <a class="nav-item">
            Documentation
          </a>
        </div>
      </div>
    </header>
  </div> <!-- end of hero-head -->
</template>

<script>
export default {
  name: 'header'
};
</script>

<style lang="css">
</style>
